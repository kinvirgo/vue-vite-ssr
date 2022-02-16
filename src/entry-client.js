import { createApp } from './main'

const { app, router, pinia } = createApp()

router.isReady().then(() => {
    console.log('>>> __INITIAL_DATA__', __INITIAL_DATA__)
    // State hydration
    pinia.state.value = window.__INITIAL_DATA__

    // 路由钩子函数
    // router.beforeResolve(async (to, from) => {
    //     console.log('>>> beforeResolve')

    //     let toMatchedComponents = getMatchedComponents(to.matched)
    //     let fromMatchedComponents = getMatchedComponents(from.matched)
    //     // 优化过滤
    //     let isSameCompoent = false
    //     let components = toMatchedComponents.filter((compnent, index) => {
    //         return (
    //             isSameCompoent ||
    //             (isSameCompoent = fromMatchedComponents[index] !== compnent)
    //         )
    //     })

    //     // 需要执行async的组件
    //     components.length &&
    //         (await Promise.allSettled(
    //             components.map(component => {
    //                 // @ts-ignore
    //                 if (component.asyncData) {
    //                     // @ts-ignore
    //                     return component.asyncData({ store, route: to })
    //                 }
    //             }),
    //         ))
    // })

    app.mount('#app')
})

function getMatchedComponents(list) {
    return list.map(({ components }) => {
        return components.default
    })
}
