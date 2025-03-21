import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/petting-pick/' : '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  plugins: [react()],
})
