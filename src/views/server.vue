<template>
    <h3>服务端</h3>
    server：{{ server }}
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Store, useStore } from "vuex";
import { AsyncDataParam, key, State } from "../store";
export default defineComponent({
    asyncData({ store, route }: AsyncDataParam) {
        console.log(">>>", route);
        
        return store.dispatch("ASYNC_SERVER");
    },
    setup(props, context) {
        const { server } = useStore<State>(key).state;

        return {
            server,
            // ...toRefs()
        };
    },
});
</script>
<style lang="scss"></style>
