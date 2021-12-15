import { Message } from "discord.js";
import { Command } from "../../utils/commandTypes";
import simplydjs, { tictactoeOptions } from "simply-djs";

const cmd = new Command({
  name: "tictactoe",
  aliases: ["ttt"],
  category: "misc",
  description: "sends the bots uptime",
  async execute(msg: Message, _args: string[]) {
    await simplydjs.tictactoe(msg, {
      credit: false,
      embedFoot: " ",
    } as tictactoeOptions);
  },
});

module.exports = cmd;
