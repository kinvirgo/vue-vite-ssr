import Store from '@/store'
import { inject } from 'vue'

const store = new Store()

// 服务器和浏览器直接初始数据转换变量全局变量__INIT_DATA__
export const __INIT_DATA__ = '__INIT_DATA__'

// 定义storeTypes
export const StoreTypes = {
    HOME: 'HOME',
}

// onBeforeRender钩子函数调用存储
export function toStore(type, state) {
    // store.set()
}

// step中hooks函数
export function useStore(type) {


}

// 定义storeType = {}

// export const __INIT_DATA__ = '__INIT_DATA__'

// export default function useStore(type) {
//     const state = inject(__INIT_DATA__, {})
//     return state[type]
// }

/**
 * 深拷贝对象
 * @param {*} data
 * @param {*} hash
 * @returns
 */
function deepCopy(data, hash = new WeakMap()) {
    if (typeof data !== 'object' || data === null) {
        throw new TypeError('传入参数不是对象')
    }
    // 判断传入的待拷贝对象的引用是否存在于hash中
    if (hash.has(data)) {
        return hash.get(data)
    }
    let newData = {}
    const dataKeys = Object.keys(data)
    dataKeys.forEach(value => {
        const currentDataValue = data[value]
        // 基本数据类型的值和函数直接赋值拷贝
        if (typeof currentDataValue !== 'object' || currentDataValue === null) {
            newData[value] = currentDataValue
        } else if (Array.isArray(currentDataValue)) {
            // 实现数组的深拷贝
            newData[value] = [...currentDataValue]
        } else if (currentDataValue instanceof Set) {
            // 实现set数据的深拷贝
            newData[value] = new Set([...currentDataValue])
        } else if (currentDataValue instanceof Map) {
            // 实现map数据的深拷贝
            newData[value] = new Map([...currentDataValue])
        } else {
            // 将这个待拷贝对象的引用存于hash中
            hash.set(data, data)
            // 普通对象则递归赋值
            newData[value] = deepCopy(currentDataValue, hash)
        }
    })
    return newData
}
