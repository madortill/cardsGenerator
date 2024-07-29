



import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 'vue': '@vue/compat',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue({}),
  ],
  base: process.env.NODE_ENV === "production" ? "/cardsGenerator/" : "/",

})
