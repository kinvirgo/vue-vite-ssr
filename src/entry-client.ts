import { createApp } from './main'

const { app, router } = createApp()

router.isReady().then(() => {
    /* do something */
    app.mount('#app')
})
