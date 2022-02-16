import { createSSRApp } from 'vue'
import { createRouter } from './router'
import { createPinia } from 'pinia'
import App from '@/App.vue'

export function createApp() {
    const app = createSSRApp(App)
    const router = createRouter()
    const pinia = createPinia()
    app.use(router)
    app.use(pinia)

    return { app, router, pinia }
}
