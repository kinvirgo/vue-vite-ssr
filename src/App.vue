<template>
    <h3>服务器渲染</h3>
    <ul>
        <li>
            <a href="/ssr/">首页</a>
        </li>
        <li>
            <a href="/ssr/about">关于我们</a>
        </li>
    </ul>
    <router-view></router-view>
</template>
<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        setup(props, context) {
            return {}
        },
    })
</script>
<style lang="scss"></style>
