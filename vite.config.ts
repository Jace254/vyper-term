import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
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
  ],
  // server: {
  //   proxy: {
  //     "/": "ws://localhost:5000"
  //   }
  // }
})
