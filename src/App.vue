<template>
    <!-- metainfo -->
    <metainfo />
    <!-- header -->
    <header class="header">
        <h3 class="header__title">服务器渲染</h3>
        <ul class="header__nav">
            <li class="header__nav--item">
                <a href="/ssr/">->首页</a>
            </li>
            <li class="header__nav--item">
                <a href="/ssr/about">->关于我们</a>
            </li>
            <li class="header__nav--item">
                <a href="/ssr/footer">->footer</a>
            </li>
        </ul>
    </header>
    <!-- router-view -->
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
<style lang="scss">
    .header {
        // display: flex;
        // align-items: center;
        padding: 24px;

        &__title {
            font-size: 16px;
            color: blue;
        }

        &__nav {
            // display: flex;
            padding: 10px 0;
            &--item {
                font-size: 14px;
                color: #333;
                &:hover{
                    color: blue;
                }
            }
        }
    }
</style>
