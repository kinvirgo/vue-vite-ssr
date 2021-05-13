<template>
    <h2>首页</h2>
    <router-view></router-view>
    count : {{ count }}
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore, Store } from "../store";

export default defineComponent({
    asyncData({ store }: { store: Store }) {
        return new Promise((resolve) => {
            store.setState("count", 4);
            // 注意ts新版本中需要传一个参数，否则报错
            resolve(true);
        });
    },
    setup(props, context) {
        let store = useStore();
        console.log(">>>", store );
        
        let state = reactive({
            count: store.getState("count"),
        });

        return {
            ...toRefs(state),
        };
    },
});
</script>
<style lang="scss"></style>
