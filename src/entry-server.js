import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'
import serialize from 'serialize-javascript'
import { useInitStore } from '@/stores/init'
import { executeAsyncData, getMatchedComponents } from '@/utils/share'

export async function render(url) {
    const { app, router, pinia } = createApp()
    const store = useInitStore()
    // 去掉base路由才能正常访问
    router.push(url.replace(router.options.history.base, ''))
    // 需要手动触发,详细见：https://next.router.vuejs.org/zh/guide/migration/#%E5%B0%86-onready-%E6%94%B9%E4%B8%BA-isready
    await router.isReady()

    // 执行asyncData(); 注意顺序与renderToString的顺序
    const route = router.currentRoute.value
    await executeAsyncData(getMatchedComponents(route), { route, store })

    const ctx = {}
    const html = await renderToString(app, ctx)
    const preloadLinks = {}

    const state = serialize(pinia.state.value)

    return { html, preloadLinks, state }
}
