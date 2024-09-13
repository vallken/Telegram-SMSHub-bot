import { config } from "dotenv";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";
import botHandlers from "./bot.js";

config();
const bot = new Telegraf(process.env.TOKEN);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

botHandlers(bot);

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
