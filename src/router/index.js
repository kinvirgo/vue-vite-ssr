import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory,
} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/home.vue'),
    },
    {
        path: '/about',
        component: () => import('@/views/about.vue'),
    },
]

export function createRouter() {
    return _createRouter({
        history: import.meta.env.SSR
            ? createMemoryHistory()
            : createWebHistory(),
        routes,
    })
}
