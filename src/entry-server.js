import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url, manifest) {
    const { app, router } = createApp()

    // 去掉base路由才能正常访问
    // router.push(url.replace(router.options.history.base, ''))


    // await router.isReady()

    // const ctx = {}
    const html = await renderToString(app)
    const preloadLinks = {}
    const state = {}

    return { html, preloadLinks, state }
}
