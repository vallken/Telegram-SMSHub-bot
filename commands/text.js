import {
    getNumber,
    getCountry,
    checkService,
    checkCountry,
    searchService,
    searchCountry
  } from "../utils/smshub.js";
  import { saveSmsApi } from "../utils/mongo.js";
  import { resetUserState } from "../utils/userState.js";
  
  export default function(bot) {
    bot.on("text", async (ctx) => {
      const userId = ctx.from.id;
      const userStateData = userState[userId];
  
      if (userStateData?.isSettingApi) {
        try {
          await saveSmsApi(userId, ctx.message.text);
          ctx.reply("Your API key has been saved.");
        } catch (err) {
          ctx.reply(`Error: ${err.message}`);
        }
        resetUserState(userId);
      } else if (userStateData?.isGetNumber) {
        const { stage, apiKey, service } = userStateData;
        if (stage === "service") {
          if (await checkService(ctx.message.text)) {
            userStateData.service = ctx.message.text.toLowerCase();
            userStateData.stage = "country";
            ctx.reply("Enter the Country Code:\n\n(Use /country to find country Codes)");
          } else {
            ctx.reply("Service ID not found. Use /service to find valid IDs.");
            resetUserState(userId);
          }
        } else if (stage === "country") {
          if (await checkCountry(ctx.message.text)) {
            try {
              const number = await getNumber(apiKey, ctx.message.text, service);
              const country = await getCountry(ctx.message.text);
              ctx.replyWithMarkdownV2(
                `Country: ${country}\nService: ${getService(service)}\nYour number: \`${number[2]}\``
              );
              userStateData.ID = number[1];
              userStateData.stage = "statusCheck";
            } catch (e) {
              ctx.reply(`Error: ${e.message}`);
            }
          } else {
            ctx.reply("Country code not found. Use /country to find valid codes.");
            resetUserState(userId);
          }
        }
      } else if (userStateData?.isSearching) {
        const searchQuery = ctx.message.text;
        const searchFunction =
          userStateData.stage === "service" ? searchService : searchCountry;
        const code = userStateData.stage === "service" ? "ID" : "Code";
        const result = await searchFunction(searchQuery);
        const formattedResults = result
          .map((res) => `Name: ${res.Name} ${code}: ${res.ID}`)
          .join("\n");
        ctx.reply(`Search results for "${searchQuery}":\n\n${formattedResults}`);
        resetUserState(userId);
      } else {
        ctx.reply(
          "Please use a command like /order, /service, or /country to start an action."
        );
      }
    });
  }
  