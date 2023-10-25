import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/index.js'),
      name: 'vue-context',
      fileName: 'vue-context'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        format: 'cjs',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
