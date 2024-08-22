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

interface Message {
	id?: number;
	date?: string;
	from: string;
	text: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname } = new URL(request.url);

		var response: Response;

		if (request.method === "POST") {
			let msg = <Message>(await request.json());
			response = Response.json(await post(msg, env));
		} else if (request.method === "GET") {
			response = Response.json(await list(env));
		} else {
			response = new Response("Method not allowed", { status: 405 });
		}

		response.headers.set("Access-Control-Allow-Origin", "*");
		response.headers.set("Access-Control-Allow-Methods", "GET, POST");
		return response;
	},
} satisfies ExportedHandler<Env>;

async function list(env: Env) {
	const { results } = await env.DB.prepare(
		"SELECT * FROM msgs LIMIT 50"
	)
		.all();
	return results;
}

async function post(msg: Message, env: Env) {
	let now = new Date(new Date().toLocaleString(undefined, { timeZone: "Asia/Shanghai" }));
	msg.date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
		+ " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

	const { results } = await env.DB.prepare(
		"INSERT INTO msgs (sms_date, sms_from, sms_text) VALUES (?, ?, ?)"
	)
		.bind(msg.date, msg.from, msg.text)
		.run();
	return results;
}
