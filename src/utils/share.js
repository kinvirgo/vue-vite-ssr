// 服务器和浏览器通用方法

// /**
//  * 执行异步方法
//  */
// export async function executeAsyncData(route, store) {
//     return Promise.all(
//         route.matched.map(({ components }) => {
//             if (components.default.asyncData) {
//                 return components.default.asyncData({ store, route })
//             }
//         }),
//     )
// }

/**
 * 提取匹配的组件
 */
export function getMatchedComponents(matchedComponents) {
    return matchedComponents.map(({ components }) => {
        return components.default
    })
}

/**
 * 获取所有需要执行asyncData的组件
 */
export function getNeedExecuteComponents(toMatchedComponents, fromMatchedComponents) {
    // 优化过滤
    let isSameCompoent = false
    return toMatchedComponents.filter((compnent, index) => {
        return isSameCompoent || (isSameCompoent = fromMatchedComponents[index] !== compnent)
    })
}

export async function _executeAsyncData(components, context) {
    return Promise.all(
        components.map(compnent => {
            if (compnent.asyncData) {
                return compnent.asyncData(context)
            }
        }),
    )
}
