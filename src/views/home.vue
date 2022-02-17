<template>
    <h3>首页-{{ title }}</h3>
    <router-view></router-view>
</template>
<script>
    import { defineComponent, reactive, toRefs, useSSRContext } from 'vue'
    import { useInitStore } from '@/stores/init'
    export default defineComponent({
        metaInfo() {
            return {
                title: 'home - My Options API title',
            }
        },
        async asyncData({ route, store }) {
            // 存储到store中
            store.homeInitState = { title: '测试home1' }
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
