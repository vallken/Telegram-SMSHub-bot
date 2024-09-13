import { promptUser } from "../utils/userState.js";

export default function(bot) {
  bot.command("setapi", (ctx) =>
    promptUser(
      ctx,
      ctx.from.id,
      { isSettingApi: true },
      "Please send your API key:"
    )
  );
}
