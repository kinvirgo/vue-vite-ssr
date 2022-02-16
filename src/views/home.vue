<template>
    <h3>首页-{{ title }}</h3>
    <router-view></router-view>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue'
    import { useInitStore } from '@/store/init'
    export default defineComponent({
        async asyncData({ store }) {
            // 存储到store中
            store.homeInitState = { title: '测试home1' }
        },
        setup(props, context) {
            const store = useInitStore()
            console.log('>>>', { ...store.homeInitState })

            const state = reactive({ ...store.homeInitState })

            return {
                ...toRefs(state),
            }
        },
    })
</script>
<style lang="scss"></style>
