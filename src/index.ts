import { Bot, webhookCallback } from "grammy/web";

const bot = new Bot(BOT_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply("Hello, world!");
});

addEventListener("fetch", webhookCallback(bot, "cloudflare"));