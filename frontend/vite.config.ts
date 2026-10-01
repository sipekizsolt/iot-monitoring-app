import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  proxy: {
    '/sensors': 'http://localhost:8080',
    '/sensor-readings': 'http://localhost:8080',
    '/alerts': 'http://localhost:8080',
  },
}
})
