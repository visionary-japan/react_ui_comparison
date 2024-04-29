import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import styleX from 'vite-plugin-stylex';

// https://vitejs.dev/config/
// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
    plugins: [react(), styleX()],
    base: '/react_ui_comparison',
    esbuild: {
        supported: {
            'top-level-await': true,
        },
    },
    optimizeDeps: { exclude: ['react-sortablejs'] },
});
