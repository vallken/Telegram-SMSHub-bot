import { promptUser } from "../utils/userState.js";
import { checkApi } from "../utils/mongo.js";

export default function(bot) {
  bot.command("order", (ctx) =>
    checkApiAndExecute(ctx, ctx.from.id, (api) => {
      promptUser(
        ctx,
        ctx.from.id,
        { isGetNumber: true, stage: "service", apiKey: api.apiKey },
        "Enter the Service ID:\n\n(Use /service to find service IDs)"
      );
    })
  );
}
