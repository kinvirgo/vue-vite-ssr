<template>
    <h3>首页-{{ title }}</h3>
    <router-view></router-view>
</template>
<script>
    import {
        defineComponent,
        getCurrentInstance,
        inject,
        reactive,
        toRefs,
    } from 'vue'
    import { useStore, toStore, StoreTypes } from '@/utils/useStore'
    export default defineComponent({
        async asyncData(route, components) {
            // 存储到store中
            toStore(StoreTypes.HOME, { title: '测试' })
        },
        setup(props, context) {
            const initState = useStore(StoreTypes.HOME)
            const state = reactive({ ...initState })

            const internalInstance = getCurrentInstance()
            // console.log('>>>', internalInstance)
            // console.log('>>>', useRouter().currentRoute.value )

            return {
                ...toRefs(state),
            }
        },
    })
</script>
<style lang="scss"></style>
