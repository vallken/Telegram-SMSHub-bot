import { getStatus } from "../utils/smshub.js";
import userState from "../utils/userState.js";

export default function(bot) {
  bot.command("status", (ctx) => {
    const { apiKey, ID, stage } = userState[ctx.from.id] || {};
    apiKey && ID && stage === "statusCheck"
      ? getStatus(apiKey, ID).then((status) => ctx.reply(`Status: ${status}`))
      : ctx.reply("No active action found. Use /order to start a new session.");
  });
}
