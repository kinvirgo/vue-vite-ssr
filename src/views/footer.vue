<template>
    <h4>这里是footer</h4>
</template>
<script>
    import { defineComponent, getCurrentInstance } from 'vue'
    export default defineComponent({
        asyncData(route) {
            // console.log(">>>> asyncData", route);
            return { val: '二级路由' }
        },
        setup(props, context) {
            const internalInstance = getCurrentInstance()
            return {}
        },
    })
</script>
<style lang="scss"></style>
