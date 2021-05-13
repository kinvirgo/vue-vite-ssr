import { createSSRApp } from "vue";
import { createRouter } from "./router";
import { createStore } from "./store";
import App from "./App.vue";
import { RouteRecordNormalized } from "vue-router";

export function createApp() {
    const app = createSSRApp(App);
    const router = createRouter();
    // @ts-ignore
    const store = !import.meta.env.SSR && window && window.__INITIAL_STATE__ ? createStore(window.__INITIAL_STATE__) : createStore();

    console.log(">>> [createStore]", store);

    // 添加钩子函数
    router.beforeResolve(async (to, from) => {
        // 由于官方删除了getMatchedComponents API,所以自定义
        let toMatchedComponents = getMatchedComponents(to.matched);
        let fromMatchedComponents = getMatchedComponents(from.matched);
        // 优化过滤
        let isSameCompoent = false;
        let components = toMatchedComponents.filter((compnent, index) => {
            return isSameCompoent || (isSameCompoent = fromMatchedComponents[index] !== compnent);
        });

        console.log("[components]", components, toMatchedComponents, fromMatchedComponents);

        // 需要执行async的组件
        components.length &&
            (await Promise.allSettled(
                components.map((component) => {
                    // @ts-ignore
                    if (component.asyncData) {
                        // @ts-ignore
                        return component.asyncData({ store, route: to });
                    }
                })
            ));
    });

    app.use(router);
    return { app, router, store };
}

function getMatchedComponents(list: RouteRecordNormalized[]) {
    return list.map(({ components }) => {
        return components.default;
    });
}
