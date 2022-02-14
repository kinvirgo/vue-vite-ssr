import { createSSRApp } from 'vue'
import { createRouter } from './router'
import App from './views/home.vue'

export function createApp() {
    const app = createSSRApp(App)
    const router = createRouter()

    app.use(router)
    return { app, router }
}
