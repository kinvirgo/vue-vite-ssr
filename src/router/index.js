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

/**
 * 给路由添加name唯一标识
 * @param { Array } routes
 */
let name_id = 1
function addRouteName(routes) {
    return (routes || []).map(route => {
        // 是否有name字段
        if (!route.hasOwnProperty('name')) {
            route.name = name_id++
        }
        // 是否存在子路由
        if (route.hasOwnProperty('children')) {
            route.children = addRouteName(route.children)
        }
        return route
    })
}

export function createRouter() {
    return _createRouter({
        history: import.meta.env.SSR
            ? createMemoryHistory('/ssr')
            : createWebHistory('/ssr'),
        routes: addRouteName(routes),
    })
}
