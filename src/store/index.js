import { isPlainObject, objectToMap, mapToObject } from '@/utils'

/**
 * 用于存储转化服务器到浏览器之间的初始数据
 */
export class Store {
    #state
    constructor(state) {
        // 初始化state值
        this.#state = isPlainObject(state) ? objectToMap(state) : new Map()
    }

    get(key, val) {
        if (this.#state.has(key)) {
            return this.#state.get(key)
        } else {
            return val
        }
    }

    set(type, val) {
        if (['number', 'string'].includes(typeof type)) {
            this.#state.set(type, val)
        } else {
            console.error(`type must be Number, String`)
        }
    }

    get state() {
        return mapToObject(this.#state)
    }
}

/*
const StoreTypes = {
    HOME: 'HOME',
}

const store = new Store()

store.set(StoreTypes.HOME, '首页')
store.get(StoreTypes.HOME)

console.log(store.state)
 */
