import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import { createMetaManager, plugin } from 'vue-meta'

// 公共样式
import '@/scss/common.scss'

export function createApp() {
    const app = createSSRApp(App)
    const router = createRouter('/ssr')
    const pinia = createPinia()
    const metaManager = createMetaManager(import.meta.env.SSR)

    app.use(router)
    app.use(pinia)
    app.use(metaManager)
    // app.use(plugin)

    return { app, router, pinia }
}
