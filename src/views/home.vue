<template>
    <h3>首页-{{ title }}</h3>
    <router-view></router-view>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue'
    import { useInitStore } from '@/stores/init'
    export default defineComponent({
        // 服务器端调用
        // serverPrefetch() {
        //     console.log('>>> serverPrefetch')
        // },
        async asyncData({ store }) {
            // 存储到store中
            store.homeInitState = { title: '测试home1' }
        },
        setup(props, context) {
            // 初始数据
            const store = useInitStore()
            console.log(">>>", store.homeInitState);
            const state = reactive({ ...store.homeInitState })

            return {
                ...toRefs(state),
            }
        },
    })
</script>
<style lang="scss"></style>
