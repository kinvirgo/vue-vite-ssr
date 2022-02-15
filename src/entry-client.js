import { createApp } from './main'

const { app, router } = createApp()

router.isReady().then(() => {

    app.provide('__INIT_DATA__', { title: '123' })

    app.mount('#app')
})
