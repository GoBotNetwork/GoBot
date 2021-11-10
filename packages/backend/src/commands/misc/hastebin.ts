import {Command} from "../../utils/types";
import {Message} from "discord.js";
import axios from "axios";

const cmd: Command = {
    name: "hastebin",
    description: "Uploads the provided text to hastebin",
    aliases: ["haste"],
    usage: "hastebin [text]",
    async execute(msg: Message, args: string[]) {
        if(args.length<1) {
            await msg.reply("Please Provide a text")
            return
        }

        const text = args.join(" ")
        const resp = await axios.post("https://hastebin.com/documents", text)
        await msg.reply(`<https://hastebin.com/${resp.data.key}>`)
    }
}

module.exports = cmd