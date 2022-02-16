import { createApp } from './main'
import { useInitStore } from './stores/init'
import {
    executeAsyncData,
    getMatchedComponents,
    getNeedExecuteComponents,
    _executeAsyncData,
} from '@/utils/share'

const { app, router, pinia } = createApp()

router.isReady().then(() => {
    if (window.__INITIAL_DATA__) {
        // State hydration
        pinia.state.value = window.__INITIAL_DATA__
    } else {
        const route = router.currentRoute.value
        _executeAsyncData(getMatchedComponents(route), { route, store: useInitStore() })
    }

    // 路由钩子函数
    router.beforeResolve(async (to, from) => {
        const components = getNeedExecuteComponents(
            getMatchedComponents(to.matched),
            getMatchedComponents(from.matched),
        )

        await _executeAsyncData(components)

        // let toMatchedComponents = getMatchedComponents(to.matched)
        // let fromMatchedComponents = getMatchedComponents(from.matched)
        // // 优化过滤
        // let isSameCompoent = false
        // let components = toMatchedComponents.filter((compnent, index) => {
        //     return isSameCompoent || (isSameCompoent = fromMatchedComponents[index] !== compnent)
        // })

        // 需要执行async的组件
        // components.length &&
        //     (await Promise.all(
        //         components.map(component => {
        //             if (component.asyncData) {
        //                 return component.asyncData({
        //                     route: to,
        //                     store: useInitStore(),
        //                 })
        //             }
        //         }),
        //     ))
    })

    app.mount('#app')
})
