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
    // import { } from "@/store/useStore"
    export default defineComponent({
        asyncData(route, components) {
            // console.log('>>>> asyncData', components)
            return { test: '测试' }
        },
        setup(props, context) {
            const initData = inject('__INIT_DATA__')

            const state = reactive({ ...initData })

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
