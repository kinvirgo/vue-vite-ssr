import { defineStore } from 'pinia'

export const useInitStore = defineStore('__INIT_DATA__', {
    state() {
        return {
            homeInitState: null,
            footerInitState: null,
        }
    },
})

