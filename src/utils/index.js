/**
 * 是普通对象
 * @param {*} val
 * @returns
 */
export function isPlainObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}
/**
 * 对象转Map
 * @param {*} obj
 * @returns
 */
export function objectToMap(obj) {
    return new Map(Object.entries(obj))
}
/**
 * Map转对象
 * @param {*} map
 * @returns
 */
export function mapToObject(map) {
    return Object.fromEntries(map)
}
