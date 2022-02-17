import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory,
} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/home.vue'),
        meta: { __id: 'home' },
        children: [
            {
                path: 'footer',
                component: () => import('@/views/footer.vue'),
                meta: { __id: 'footer' },
            },
        ],
    },
    {
        path: '/about',
        component: () => import('@/views/about.vue'),
        meta: { __id: 'footer' },
    },
]

export function createRouter(base) {
    return _createRouter({
        history: import.meta.env.SSR
            ? createMemoryHistory(base)
            : createWebHistory(base),
        routes,
    })
}
