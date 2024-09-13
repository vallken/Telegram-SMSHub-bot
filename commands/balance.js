import { checkApiAndExecute } from "../utils/userState.js";
import { getBalance } from "../utils/smshub.js";

export default function(bot) {
  bot.command("balance", (ctx) =>
    checkApiAndExecute(ctx, ctx.from.id, async () => {
      const balance = await getBalance(ctx.from.id);
      ctx.reply(`Your current balance is: ${balance}`);
    })
  );
}
