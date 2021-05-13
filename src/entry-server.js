import { createApp } from "./main"
import { renderToString } from "@vue/server-renderer"
import serialize from "serialize-javascript";

export async function render(url, manifest){
    const { app, router, store } = createApp();

    // 去掉base路由才能正常访问
    router.push(url.replace(router.options.history.base, ""));
    // 需要手动触发,详细见：https://next.router.vuejs.org/zh/guide/migration/#%E5%B0%86-onready-%E6%94%B9%E4%B8%BA-isready
    await router.isReady();
    // 执行asyncData(); 注意顺序与renderToString的顺序
    await invokeAsyncData({ store, route: router.currentRoute.value });

    const ctx = {};
    const html = await renderToString(app, ctx);

    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

    return { html, preloadLinks, stateStr: serialize(store.state) }
}

function invokeAsyncData({ store, route }) {
    console.log("[invokeAsyncData]", route.matched);
    return Promise.allSettled(
        route.matched.map(({ components }) => {
            let asyncData = components.default.asyncData || false;
            return asyncData && asyncData({ store, route });
        })
    );
}

function renderPreloadLinks(modules, manifest) {
    let links = "";
    const seen = new Set();
    modules.forEach((id) => {
        const files = manifest[id];
        if (files) {
            files.forEach((file) => {
                if (!seen.has(file)) {
                    seen.add(file);
                    links += renderPreloadLink(file);
                }
            });
        }
    });
    return links;
}

function renderPreloadLink(file) {
    if (file.endsWith(".js")) {
        return `<link rel="modulepreload" crossorigin href="${file}">`;
    } else if (file.endsWith(".css")) {
        return `<link rel="stylesheet" href="${file}">`;
    } else {
        // TODO
        return "";
    }
}
