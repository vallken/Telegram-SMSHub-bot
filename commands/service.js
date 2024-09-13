import { isUserOrdering, promptUser } from "../utils/userState.js";

export default function(bot) {
  bot.command("service", (ctx) =>
    isUserOrdering(ctx.from.id)
      ? ctx.reply("You're in the middle of an order. Please finish or /cancel it first.")
      : promptUser(
          ctx,
          ctx.from.id,
          { isSearching: true, stage: "service" },
          "Please enter a search query for services."
        )
  );
}
