import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSiteEditorPlugin } from './tools/site-editor-plugin.js'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    createSiteEditorPlugin({
      allowedModels: ['content'],
      mediaRoots: [
        ['public/assets', '/assets'],
        ['public/assets/uploads', '/assets/uploads'],
      ],
      allowedPublishPaths: ['src/data/', 'public/assets/uploads/'],
    }),
  ],
})
