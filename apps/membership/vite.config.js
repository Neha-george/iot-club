import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/membership/',
    plugins: [react()],
    server: {
        port: 5174,
        strictPort: true,
    },
    envDir: '../../',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
