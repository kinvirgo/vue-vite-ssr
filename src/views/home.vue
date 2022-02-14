<template>
    <h3>首页</h3>
    <router-view></router-view>
</template>
<script>
    import { defineComponent, getCurrentInstance } from 'vue'
    import { useRouter } from 'vue-router'
    export default defineComponent({
        asyncData(route, components) {
            console.log('>>>> asyncData', components)
            return { test: '测试' }
        },
        setup(props, context) {
            const internalInstance = getCurrentInstance()
            // console.log('>>>', internalInstance)
            console.log('>>>', useRouter().currentRoute.value )

            return {}
        },
    })
</script>
<style lang="scss"></style>
