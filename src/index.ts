/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const redirects: Record<string, string> = {
	'/gracias': 'https://exabeauty.com.ar/'
}


export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url)
		const { pathname } = url
		if (redirects[pathname]) {
			return Response.redirect(redirects[pathname], 301);
		}

		return new Response(`No redirect found for path "${url.pathname}"`, {status: 404});
	},
};
