import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '~': path.resolve(__dirname, './public'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/global.scss";@import "./src/styles/mixin.scss";@import "./src/styles/variable.scss";`,
            },
        },
    },
    server: {
        proxy: {
            '/login': {
                target: 'https://management-apis.azurewebsites.net',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/login/, '/login'),
            },
            '/info': {
                target: 'https://management-apis.azurewebsites.net/api/Auth',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/info/, '/info'),
            },
            '/api': {
                target: 'https://management-apis.azurewebsites.net',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
            },
        },
    },
});
