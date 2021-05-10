import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mxt-merge/',
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'script',
      registerType: 'autoUpdate',
      manifest: {
        // content of manifest
        icons: [
          {
            src: './img/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './img/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
      },
      workbox: {
        skipWaiting: true
      }
    })
  ]
})
