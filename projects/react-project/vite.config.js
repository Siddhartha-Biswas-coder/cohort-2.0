import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-console-emulator'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  ssr: {
    noExternal: ['react-console-emulator']
  }
})
