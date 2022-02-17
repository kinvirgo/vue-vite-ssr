<template>
    <img src="https://h5static.oss-cn-shenzhen.aliyuncs.com/lapp/vip/new-years-day/img/img-list-banner.jpg" alt="vite" />
    <h3>异步数据：{{ content }}</h3>
    <router-view></router-view>
</template>
<script>
    import { defineComponent, reactive, toRefs, useSSRContext } from 'vue'
    import { useInitStore } from '@/stores/init'
    export default defineComponent({
        metaInfo() {
            return {
                title: '首页-服务器渲染',
            }
        },
        async asyncData({ route, store }) {
            // 存储到store中
            store.homeInitState = { content: '我是来自服务器数据' }
        },
        setup(props, context) {
            // 初始数据
            const store = useInitStore()
            const state = reactive({ ...store.homeInitState })

            // if (import.meta.env.SSR) {
            //     const ctx = useSSRContext()
            //     console.log('>>> ctx', ctx)
            // }

            return {
                ...toRefs(state),
            }
        },
    })
</script>
<style lang="scss"></style>
