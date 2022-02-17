// 服务器和浏览器通用方法

/**
 * 提取匹配的组件
 */
export function getMatchedComponents(matchedComponent) {
    return matchedComponent.matched.map(({ components }) => {
        return components.default
    })
}

/**
 * 优化过滤所有需要执行asyncData的组件
 */
export function getNeedExecuteComponents(toMatchedComponents, fromMatchedComponents) {
    let isSameCompoent = false
    return toMatchedComponents.filter((compnent, index) => {
        return isSameCompoent || (isSameCompoent = fromMatchedComponents[index] !== compnent)
    })
}

/**
 * 执行asyncData钩子函数
 * @param {*} components
 * @param {*} context
 * @returns
 */
export async function executeAsyncData(components, context) {
    return Promise.all(
        components.map(compnent => {
            if (compnent.asyncData) {
                return compnent.asyncData(context)
            }
        }),
    )
}
