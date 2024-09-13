import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    apiKey: {type: String, required: true}
})

const user = mongoose.model('User', userSchema)

export default user;