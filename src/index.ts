import { Bot, webhookCallback, InlineKeyboard } from "grammy/web";

const bot = new Bot(BOT_TOKEN);

const welcomeText =
  "Rankie is a user-friendly app that uses the TrueSkill rating system to calculate players' skill levels and provide them with a simple and easy-to-use platform to enhance their gaming experience. It helps players track their personal progress and compare their ranking with other players, including those they don't know. The app is ideal for players who want to add a competitive edge to their gaming experience and enjoy more interesting and challenging games. Initially designed for the Lisbon Padel community, the app may expand to other games to provide a comprehensive platform for all types of players.";

const inlineKeyboard = new InlineKeyboard()
  .url("🎾 Create a game", "https://rankie.vercel.app/game/create")
  .row()
  .url("📈 View rankings", "https://rankie.vercel.app/rankings")
  .row()
  .url("❤️ Community", "https://t.me/rankiechat")
  .text("ℹ️ About", "click-about");

bot.command("start", async (ctx) => {
  // if (ctx.from?.id) {
  //   let userUrl = makeGetUrl(ctx.from?.id);
  //   const response = await handleRequest(userUrl);
  //   console.log(response);
  //   if (response.ok && response.body !== null && response.body.rating_public !== null) {
  //     await ctx.reply(
  //       `Hey, I know your rating! Its ${response.body.rating_public}. You are doing pretty well.`
  //     );
  //   } else {
  //     await ctx.reply("I don't know your rating yet. Let's create an account");
  //   }
  // }

  await ctx.reply(welcomeText, {
    reply_markup: inlineKeyboard,
  });

  // await ctx.reply("Hello, people! Rating is here! Your id is " + ctx.from?.id);
});

bot.callbackQuery("click-about", async (ctx) => {
  await ctx.reply(welcomeText, {
    reply_markup: inlineKeyboard,
  });
});

function makeGetUrl(telegramId: number) {
  let someHost = "https://padel-db.accuraten.workers.dev";
  let url = someHost + "/user/info/" + telegramId.toString;
  return url;
}

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response: any) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  }
  return response.text();
}

async function handleRequest(url: string) {
  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  };
  const response = await fetch(url, init);
  const results = await gatherResponse(response);
  return results;
}

addEventListener("fetch", webhookCallback(bot, "cloudflare"));
