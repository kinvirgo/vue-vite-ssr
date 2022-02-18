import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/ssr/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    // css配置
    css: {
        preprocessorOptions: {
            // scss预处理
            scss: {
                additionalData: `@import "./src/scss/utils.scss";`,
                charset: false,
            },
        },
    },
    // 终端日志禁止清屏
    clearScreen: false,
    build: {
        assetsDir: 'static',
    },
    ssr: {
        noExternal: [/^vue-meta*/],
    },
})
