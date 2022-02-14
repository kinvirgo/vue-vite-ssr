import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url, manifest) {
    const { app, router } = createApp()
    // 去掉base路由才能正常访问
    router.push(url.replace(router.options.history.base, ''))
    // 需要手动触发,详细见：https://next.router.vuejs.org/zh/guide/migration/#%E5%B0%86-onready-%E6%94%B9%E4%B8%BA-isready
    await router.isReady()



    // 执行asyncData(); 注意顺序与renderToString的顺序
    const data = await invokeAsyncData({ route: router.currentRoute.value }, router)

    console.log('>>> data', router.currentRoute.value)

    const ctx = {}
    const html = await renderToString(app, ctx)
    const preloadLinks = {}
    const state = {}

    return { html, preloadLinks, state }
}
function invokeAsyncData({ route }) {
    return Promise.allSettled(
        route.matched.map(({ components }) => {
            // console.log(">>> components", components);
            let asyncData = components.default.asyncData || false
            return asyncData && asyncData({ route }, components)
        }),
    )
}
