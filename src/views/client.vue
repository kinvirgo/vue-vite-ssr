<template>
    <h3>客户端</h3>
    client:{{ client }}
</template>
<script lang="ts">
import { defineComponent, isReactive, toRefs } from "vue";
import { Store, useStore } from "vuex";
import { AsyncDataParam, key, State } from "../store";
export default defineComponent({
    asyncData({ store }: AsyncDataParam) {
        console.log("[AYSNC_CLIENT]");
        
        return store.dispatch("AYSNC_CLIENT");
    },
    setup(props, context) {
        const { client } = useStore<State>(key).state;

        console.log(">>>", client, isReactive(client));

        return {
            client,
            // ...toRefs()
        };
    },
});
</script>
<style lang="scss"></style>
