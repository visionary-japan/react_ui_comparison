import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
// biome-ignore lint/nursery/noDefaultExport: <explanation>
export default defineConfig({
    plugins: [react()],
    base: process.env.VITE_BASE_PATH,
});
