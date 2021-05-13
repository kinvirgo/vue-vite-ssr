<template>
    <h3>客户端</h3>
    client:{{ client }}
</template>
<script lang="ts">
import { defineComponent, isReactive, reactive, toRefs } from "vue";
import { useStore, Store } from "../store";

// import { Store, useStore } from "vuex";
// import { AsyncDataParam, key, State } from "../store";
export default defineComponent({
    // asyncData({ store }: AsyncDataParam) {
    //     console.log("[AYSNC_CLIENT]");

    //     return store.dispatch("AYSNC_CLIENT");
    // },
    asyncData({ store }: { store: Store }) {
        return new Promise((resolve) => {
            store.setState("client", ["vue", "vue-router"]);
            // 注意ts新版本中需要传一个参数，否则报错
            resolve(true);
        });
    },
    setup(props, context) {
        let store = useStore();

        let state = reactive({
            client: store.getState("client"),
        });

        console.log(">>>", state);

        return {
            ...toRefs(state),
        };
    },
});
</script>
<style lang="scss"></style>
