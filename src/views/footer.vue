<template>
    <h4>这里是footer</h4>
</template>
<script>
    import { defineComponent, reactive, toRefs } from 'vue'
    export default defineComponent({
        asyncData({ store }) {
            // 存储到store中
            store.footerInitState = { title: '测试footer' }
        },
        setup(props, context) {
            const state = reactive({})

            return {
                ...toRefs(state),
            }
        },
    })
</script>
<style lang="scss"></style>
