import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import { createMetaManager, plugin, useMeta } from 'vue-meta'

export function createApp() {
    const app = createSSRApp(App)
    const router = createRouter('/ssr')
    const pinia = createPinia()
    const metaManager = createMetaManager(import.meta.env.SSR)

    app.use(router)
    app.use(pinia)
    app.use(metaManager)
    app.use(plugin)

    return { app, router, pinia }
}
