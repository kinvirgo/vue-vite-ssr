import express from 'express'
import path from 'path'
import { readFileSync } from 'fs'

const resolve = p => path.resolve(__dirname, p)

const isTest = process.env.VITEST

const createServer = async (
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production'
) => {
    const app = express()
    let indexTemplate,
        manifest = {},
        vite

    if (isProd) {
        indexTemplate = readFileSync(resolve('dist/client/index.html'), 'utf-8')
        manifest = readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8')

        app.use((await import('compression')).default())
        app.use(
            express.static('dist/client', {
                index: false,
                maxAge: 24 * 60 * 60 /* 一天 */,
            })
        )
    } else {
        indexTemplate = resolve('index.html')
        vite = await (
            await import('vite')
        ).createServer({
            // base: '/test/',
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true,
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency
                    usePolling: true,
                    interval: 100,
                },
                // hmr: {
                //     port: hmrPort,
                // },
            },
            appType: 'custom',
        })
    }

    app.use('*', async (req, res) => {
        try {
            const url = req.originalUrl

            let template, render
            if (isProd) {
                template = htmlTemplate
                render = (await import('./dist/server/entry-server.js')).render
            } else {
                template = await vite.transformIndexHtml(url, htmlTemplate)
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render
            }

            const [appHtml, preloadLinks] = await render()

            // 替换html标记
            html = template
                // .replace(`<!--app-head-->`, teleports.head || '')
                .replace(`<!--preload-links-->`, preloadLinks)
                // .replace(`<!--initial-data-->`, `<script>window.__INITIAL_DATA__=${state}</script>`)
                .replace(`<!--app-html-->`, appHtml)
        } catch (error) {
            isProd || vite.ssrFixStacktrace(error)
            console.error(`[error]`, error.stack)
            res.status(500).end(error.stack)
        }
    })

    return { app, vite }
}

createServer().then(({ app }) => {
    app.listen(8080, () => {
        console.log('http://localhost:8080')
    })
})
