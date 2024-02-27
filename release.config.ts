import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
      'vue': 'vue/dist/vue.esm-browser.prod.js',
    },
  },
  build: {
    lib: {
      entry: 'src/web.ts', 
      formats: ['es'],
      fileName: ((format, entryName) => entryName +".js")
    },
    sourcemap: true,
    target: 'esnext',
    minify: true,
    outDir: 'lib',
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-'),
        },
      },
      reactivityTransform: true,
    }),
    UnoCSS(),
    dts({
      staticImport: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: false,
    }),
    cssInjectedByJsPlugin(),
  ],
})
