const userState = {};

export const resetUserState = (userId) => {
  userState[userId] = {};
};

export const isUserOrdering = (userId) => userState[userId]?.isGetNumber;

export const promptUser = (ctx, userId, state, message) => {
  resetUserState(userId);
  userState[userId] = state;
  ctx.reply(message);
};

export const checkApiAndExecute = async (ctx, userId, callback) => {
  const api = await checkApi(userId);
  if (api) return callback(api);
  ctx.reply("Your API key is not set. Please use /setapi");
};

export default userState;
