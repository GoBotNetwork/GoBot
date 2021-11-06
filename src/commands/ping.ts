import { Message } from "discord.js";
import { Command } from "../types";
import { client } from "../client";

const cmd: Command = {
  aliases: [],
  name: "ping",
  description: "sends the bots latency",
  execute(message: Message, _args: string[]) {
    message.reply(`\`${client.ws.ping}\`ms`);
  }
};

module.exports = cmd;