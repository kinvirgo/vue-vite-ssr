import { createApp } from './main'

const { app, router, pinia } = createApp()

router.isReady().then(() => {

    console.log(window.__INIT_DATA__);

    pinia.state.value = window.__INIT_DATA__

    app.mount('#app')
})
