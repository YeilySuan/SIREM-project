import adapter from '@sveltejs/adapter-node';  // Asegúrate de tener el adaptador correcto
import { defineConfig } from 'vite';

export default defineConfig({
  kit: {
		/*paths: {
			base: '/',
		},*/
    // Configuración del adaptador para Node.js
    adapter: adapter(),

    
  }
});

