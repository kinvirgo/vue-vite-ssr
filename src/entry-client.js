import { createApp } from './main'
import { useInitStore } from './stores/init'
import { executeAsyncData, getMatchedComponents, getNeedExecuteComponents } from '@/utils/share'
import { useMeta } from 'vue-meta'

const { app, router, pinia } = createApp()

router.isReady().then(() => {
    if (window.__INITIAL_DATA__) {
        // State hydration
        pinia.state.value = window.__INITIAL_DATA__ || {}
    } else {
        const route = router.currentRoute.value
        executeAsyncData(getMatchedComponents(route), { route, store: useInitStore() })
    }

    // detele __INITIAL_DATA__
    window.__INITIAL_DATA__ = null

    // 路由钩子函数
    router.beforeResolve(async (to, from) => {
        // 执行asyncData
        await executeAsyncData(
            getNeedExecuteComponents(getMatchedComponents(to), getMatchedComponents(from)),
            { route: to, store: useInitStore() },
        )
        // metaInfo
        // console.log(">>>", to);
        // useMeta()
    })

    app.mount('#app')
})
