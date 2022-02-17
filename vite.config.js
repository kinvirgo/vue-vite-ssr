import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
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
