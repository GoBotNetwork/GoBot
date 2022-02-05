import { Command } from "../../utils/Command";
import { Message } from "discord.js";
import axios from "axios";

const cmd = new Command({
  name: "cat",
  description: "Sends a Picture of a Cat",
  usage: "cat",
  category: "image",
  async execute(msg: Message, _args: string[]) {
    const resp = await axios.get("https://api.thecatapi.com/v1/images/search");
    const link = resp.data[0].url;

    await msg.reply(link);
  },
});

export default cmd;
