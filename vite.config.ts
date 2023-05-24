import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  base: '/Shopping_cart',
  plugins: [
    react(),
    UnoCSS({
      configFile: 'uno.config.ts',
    })
  ],
})