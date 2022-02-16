import { defineStore } from 'pinia'

export const useInitStore = defineStore('init', {
    state() {
        return {
            homeInitState: null,
            footerInitState: null,
        }
    },
})
