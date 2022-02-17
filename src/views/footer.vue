<template>
    <h4 class="h4">{{ asyncText }}</h4>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue'
    import { useInitStore } from '@/stores/init'
    export default defineComponent({
        metaInfo() {
            return {
                title: '二级路由-服务器渲染',
            }
        },
        async asyncData({ store }) {
            // 存储到store中
            store.footerInitState = { asyncText: '来自footer的异步数据' }
        },
        setup(props, context) {
            // 初始数据
            const { footerInitState } = useInitStore()
            const state = reactive({ ...footerInitState })

            return {
                ...toRefs(state),
            }
        },
    })
</script>
<style lang="scss">
    .h4 {
        color: red;
    }
</style>
