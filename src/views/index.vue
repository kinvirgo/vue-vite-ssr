<template>
    <h2>首页</h2>
    <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
    asyncData() {
        console.log(">>> index [aysncData]");
        return Promise.resolve();
    },
    setup(props, context) {
        return {};
    },
});
</script>
<style lang="scss"></style>
