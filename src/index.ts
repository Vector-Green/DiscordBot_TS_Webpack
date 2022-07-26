import { Message } from "discord.js";

const discordJs = require("discord.js");

if (process.env.NODE_ENV == "development") {
  const dotenvFlow = require("dotenv-flow");
  dotenvFlow.config({
    silent: true,
  });
}

const client = new discordJs.Client({
  intents: [
    discordJs.GatewayIntentBits.Guilds,
    discordJs.GatewayIntentBits.GuildMessages,
  ],
});

console.log("Starting...");

client.on("ready", () => {
  console.log(`the bot is online!`);
});

client.on("messageCreate", (message: Message) => {
  console.log("messageCreate");
  const authorId = message.author.id;
  const authorName = message.author.username;
  console.log(`author: ${authorName}`);
  if (message.content === "hello") {
    message.reply({ content: "world" });
  }
});

if (!process.env.TOKEN) {
  throw new Error("You need to provide TOKEN to launch server");
}
client.login(process.env.TOKEN);