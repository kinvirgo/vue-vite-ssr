const fs = require('fs')
const path = require('path')
const resolve = p => path.resolve(__dirname, p)
const express = require('express')
const helmet = require('helmet')

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
    let vite
    const app = express()

    if (isProd) {
        // 生产环境
        app.use(require('compression')())
        // app.use(helmet)
        app.use(
            express.static('dist/client', {
                index: false,
                maxAge: 864000 /* 一天 */,
            }),
        )
    } else {
        // 开发环境
        let { createServer: _createServer } = require('vite')
        vite = await _createServer({
            root,
            server: {
                middlewareMode: true,
                watch: {
                    usePolling: true,
                    interval: 100,
                },
            },
        })
        app.use(vite.middlewares)
    }

    // html模版
    const htmlTemplate = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''
    // 映射文件
    const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}

    app.get('/ssr/*', async (req, res) => {
        const { url, query } = req
        console.log(`[server] ${new Date()} - ${url} - ${JSON.stringify(query)}`)

        try {
            let template, render
            if (isProd) {
                // 生产环境
                template = htmlTemplate
                render = require('./dist/server/entry-server.js').render
            } else {
                // 开发环境
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render
            }
            let { html, state, preloadLinks, teleports } = await render(url, manifest)
            // 替换html标记
            html = template
                .replace(`<!--app-head-->`, teleports.head)
                .replace(`<!--preload-links-->`, preloadLinks)
                .replace(`<!--initial-data-->`, `<script>window.__INITIAL_DATA__=${state}</script>`)
                .replace(`<!--app-html-->`, html)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (error) {
            isProd || vite.ssrFixStacktrace(error)
            console.error(`[error]`, error.stack)
            res.status(500).end(error.stack)
        }
    })

    // 重定向
    app.use('*', async (req, res) => {
        res.redirect('/ssr/')
    })

    return { app }
}

// 创建服务
createServer().then(({ app }) => {
    app.listen(5000, () => {
        console.log('[server] http://localhost:5000')
    })
})
