import { config } from "dotenv";
import mongoose from "mongoose";
import { Telegraf } from "telegraf";
import botHandlers from "./bot.js";
import express from "express";

config();
const bot = new Telegraf(process.env.TOKEN);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

botHandlers(bot);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
