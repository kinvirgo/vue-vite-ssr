const fs = require("fs");
const path = require("path");
const express = require("express");
const resolve = (p) => path.resolve(__dirname, p);

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production") {
    const app = express();
    let vite;
    if (isProd) {
        // 生产环境
        app.use(require("compression")());
        app.use(
            require("serve-static")(resolve("dist/client"), {
                index: false,
            })
        );
    } else {
        // 开发
        let { createServer: _createServer } = require("vite");
        vite = await _createServer({
            root,
            server: {
                middlewareMode: true,
                watch: {
                    usePolling: true,
                    interval: 100,
                },
            },
        });
        app.use(vite.middlewares);
    }

    // 模版
    const indexHtml = isProd ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8") : "";
    // 映射文件
    const manifest = isProd ? require("./dist/client/ssr-manifest.json") : {};

    app.use("*", async (req, res) => {
        const { originalUrl: url } = req;
        console.log(`[server] ${new Date()} - ${url}`);
        try {
            let template, render;
            if (isProd) {
                // 生产
                template = indexHtml;
                render = require("./dist/server/entry-server.js").render;
            } else {
                // 开发
                template = fs.readFileSync(resolve("index.html"), "utf-8");
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
            }

            let { html, preloadLinks, stateStr } = await render(url, manifest);
            // 替换标记
            html = template
                .replace(`<!-- app-preload-links -->`, preloadLinks)
                .replace(
                    `<!-- app-script -->`,
                    `<script type="application/javascript">window.__IS_FROM_SSR__=true;window.__INITIAL_STATE__=${stateStr}</script>`
                )
                // 用于客户端标记服务器渲染
                .replace(`<!--app-html-->`, html);
            // 响应
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            isProd || vite.ssrFixStacktrace(e);
            console.error(`[error]`, e.stack);
            res.status(500).end(e.stack);
        }
    });

    return { app };
}

// 创建服务
createServer().then(({ app }) => {
    app.listen(5000, () => {
        console.log("[server] http://localhost:5000");
    });
});
