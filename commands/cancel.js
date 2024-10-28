import { cancelAction } from "../utils/smshub.js";
import userState, { resetUserState } from "../utils/userState.js";

export default function(bot) {
  bot.command("cancel", (ctx) => {
    const { apiKey, ID, stage } = userState[ctx.from.id] || {};
    if (stage === "service" || stage === "country") {
      resetUserState(ctx.from.id);
      ctx.reply("Session has been reset.");
    } else if (apiKey && ID && stage === "statusCheck") {
      cancelAction(apiKey, ID)
        .then((response) => {
          ctx.reply(
            response.includes("ACCESS_CANCEL")
              ? "Action cancelled successfully"
              : "Failed to cancel action"
          );
          resetUserState(ctx.from.id);
        })
        .catch((err) => ctx.reply(`Error: ${err.message}`));
    } else {
      ctx.reply("No active action found. Use /order to start a new session.");
    }
  });
}
