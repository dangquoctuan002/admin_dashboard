import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  commonjsOptions: {
    include: [/@workspace\/ckeditor5-custom-build/, /node_modules/],
  }
})
