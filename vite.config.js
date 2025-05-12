import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { cloudflare } from "@cloudflare/vite-plugin";
import vueDevTools from 'vite-plugin-vue-devtools'

let buildNumber = '111'
try {
  if (import.meta.env.VITE_BUILD_NUMBER) {
    buildNumber = import.meta.env.VITE_BUILD_NUMBER
  } else if (process.env.VITE_BUILD_NUMBER) {
    buildNumber = process.env.VITE_BUILD_NUMBER
  }
} catch (error) {
  buildNumber = '1111'
}

export default defineConfig({
  plugins: [vue(),
    vueDevTools(),
    cloudflare()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __BUILD_NUMBER__: buildNumber
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // 'vuetify': ['vuetify'],
          'vue': ['vue']
        }
      }
    }
  }
}) 