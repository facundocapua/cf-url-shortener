import qr from 'qrcode'

const redirects: Record<string, string> = {
	'/gracias': 'https://exabeauty.com.ar/',
	'/tarjeta': 'https://exabeauty.com.ar/vcard.vcf'
}


export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url)
		const { pathname, searchParams } = url
		if (redirects[pathname]) {
			if(searchParams.get('format') === 'qr'){
				const image = await qr.toString(redirects[pathname], { errorCorrectionLevel: 'H' })
				const headers = { "Content-Type": "image/svg+xml" }
				return new Response(image, { headers })
			}

			return Response.redirect(redirects[pathname], 301);
		}

		return new Response(`No redirect found for path "${url.pathname}"`, {status: 404});
	},
};
