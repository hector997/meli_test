import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5001', // express server
				changeOrigin: true, // changes the origin of the host header to the target URL
				secure: false, //HTTPS
			},
		},
	},
});
