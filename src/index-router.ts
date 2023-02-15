import { Bot, webhookCallback } from "grammy/web";
import {
	Router, // the router itself
	IRequest, // lightweight/generic Request type
	RouterType, // generic Router type
	Route, // generic Route type
} from "itty-router";

const router = Router({ base: "/" });

router.get("/version", (request) => new Response(`1.0`));

router.get("/telegram", (request) => {
	const bot = new Bot(BOT_TOKEN);

	bot.command("start", async (ctx) => {
		await ctx.reply("Hello, world!");
	});

	return webhookCallback(bot, "cloudflare");
});

router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener("fetch", (event: FetchEvent) => {
	event.respondWith(router.handle(event.request));
});
