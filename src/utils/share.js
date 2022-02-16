// 服务器和浏览器通用方法

/**
 * 执行异步方法
 */
export async function executeAsyncData(route, store) {
    return Promise.all(
        route.matched.map(({ components }) => {
            if (components.default.asyncData) {
                return components.default.asyncData({ store, route })
            }
        }),
    )
}
