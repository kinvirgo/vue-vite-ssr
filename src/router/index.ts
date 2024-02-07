import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const pages = import.meta.glob('./views/*.vue')

const routes = Object.keys(pages).map(path => {
    const name = path.match(/\.\/views(.*)\.vue$/)![1].toLowerCase()
    return {
        path: name === '/home' ? '/' : name,
        component: pages[path], // () => import('./pages/*.vue')
    }
})

export const createRouter = (base = '') => {
    return _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory(base) : createWebHistory(base),
        routes,
    })
}
