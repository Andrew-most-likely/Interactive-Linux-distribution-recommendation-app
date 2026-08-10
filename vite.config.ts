import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// If deploying to https://<user>.github.io/<repo>/, set base to '/<repo>/'.
// If deploying to a custom domain at the root, leave it as '/'.
export default defineConfig({
  plugins: [react()],
  base: '/Interactive-Linux-distribution-recommendation-app/',
})
