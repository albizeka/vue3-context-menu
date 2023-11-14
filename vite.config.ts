import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: true,
    assetsDir: 'src/assets',
    lib: {
      entry: resolve(__dirname, 'src/js/index.js'),
      name: 'vue-context',
      fileName: 'vue-context'
    },
    rollupOptions: {
      external: ['vue', '@mahdikhashan/vue3-click-outside'],
      output: {
        globals: {
          vue: 'Vue',
          "@mahdikhashan/vue3-click-outside": "@mahdikhashan/vue3-click-outside"
        },
        assetFileNames: ({ name }) => {
          // Move files which end with gif, jpeg, jpg, png or svg to assets/images.
          // If you don't need hash, you can use the [name] placeholder like this:
          // 'assets/images/[name][extname]'
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }

          // Move files which end with css to assets/css
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }

          // Default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash][extname]';
        },
      }
    }
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
