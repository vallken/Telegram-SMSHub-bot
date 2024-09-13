import { isUserOrdering, promptUser } from "../utils/userState.js";

export default function(bot) {
  bot.command("country", (ctx) =>
    isUserOrdering(ctx.from.id)
      ? ctx.reply("You're in the middle of an order. Please finish or /cancel it first.")
      : promptUser(
          ctx,
          ctx.from.id,
          { isSearching: true, stage: "country" },
          "Please enter a search query for countries."
        )
  );
}
