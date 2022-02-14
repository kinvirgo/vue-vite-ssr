const fs = require('fs')
const path = require('path')
const resolve = p => path.resolve(__dirname, p)
const express = require('express')
const helmet = require('helmet')

async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === 'production',
) {
    let vite
    const app = express()

    if (isProd) {
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
    const htmlTemplate = isProd
        ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
        : ''
    // 映射文件
    const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}

    app.use('/ssr/*', async (req, res) => {
        const { originalUrl: url } = req
        console.log(`[server] ${new Date()} - ${url}`)
        try {
            let template, render
            if (isProd) {
            } else {
                // 开发环境
                template = fs.readFileSync(resolve('index.html'), 'utf-8')
                template = await vite.transformIndexHtml(url, template)
                render = (await vite.ssrLoadModule('/src/entry-server.js'))
                    .render
            }

            console.log('>>> render', url)

            let { html, state, preloadLinks } = await render(url, manifest)
            // 替换html标记
            html = template.replace(`<!--app-html-->`, html)
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (error) {
            isProd || vite.ssrFixStacktrace(error)
            console.error(`[error]`, error.stack)
            res.status(500).end(error.stack)
        }
    })

    return { app }
}

// 创建服务
createServer().then(({ app }) => {
    app.listen(5000, () => {
        console.log('[server] http://localhost:5000')
    })
})
