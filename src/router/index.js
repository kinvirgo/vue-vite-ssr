import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/home.vue'),
        meta: {
            // metaInfo
            title: '首页',
            htmlAttrs: {
                lang: 'en',
                amp: true,
            },
        },
        children: [
            {
                path: 'footer',
                component: () => import('@/views/footer.vue'),
                meta: {
                    title: '二级路由',
                },
            },
        ],
    },
    {
        path: '/about',
        component: () => import('@/views/about.vue'),
        meta: {
            title: '关于我们',
        },
    },
]

export function createRouter(base) {
    return _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory(base) : createWebHistory(base),
        routes,
    })
}
