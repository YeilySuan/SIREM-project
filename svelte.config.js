import adapter from '@sveltejs/adapter-node';
//import { vitePreprocess } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	//preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build' // Asegúrate de que sea 'build'
		})
	}
};

export default config;









/*import adapter from '@sveltejs/adapter-vercel';

import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter()
	}
};

*/

/*
/** @type {import('@sveltejs/kit').Config} */

/*
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;

*/