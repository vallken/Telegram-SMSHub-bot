import user from "./smsModel.js"

async function saveSmsApi(userId, apiKey) {
    const existingUser = await user.findOne({ userId });
  
    if (existingUser) {
      existingUser.apiKey = apiKey;
      await existingUser.save();
    } else {
      const newUser = new user({ userId, apiKey });
      await newUser.save();
    }
    return "SMS API berhasil disimpan!";
  }

async function checkApi(userId) {
    const existingUser = await user.findOne({ userId });
    if (existingUser) {
      return existingUser;
    } else {
      return false
    }
  
}


export {saveSmsApi, checkApi}