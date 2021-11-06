import {Message, MessageEmbed, PartialDMChannel, TextChannel} from "discord.js";
import fs from "fs";
import {PREFIX} from "./constants";
import {Command} from "./types";
import {Embeds, FieldsEmbed} from "discord-paginationembed";
import {client} from "./client";

let commands: Command[] = [];

const commandFiles = fs
    .readdirSync("./dist/commands")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`) as Command;

    if(command.name != undefined) {
        commands.push(command);
        console.log(`Registered ${command.name} command`);
    }
}

export const handle = async (message: Message) => {
    const content = message.content;
    if (content === PREFIX + "help") {
        await sendHelp(message);
    } else if (content.startsWith(PREFIX)) {
        const commandName = content.split(" ")[0].substring(PREFIX.length);
        const args: string[] = content.split(" ");
        args.shift();
        console.log(commandName)
        console.log(args)
        for (const command of commands) {
            if (command.name === commandName || (command.aliases && command.aliases.includes(commandName))) {
                command.execute(message, args);
            }
        }
    }

};

async function sendHelp(msg: Message) {
    const embed = new MessageEmbed()
    embed.setColor("#528B8B")
    embed.setTitle(":books: Command Info ")
    if(client.user?.avatarURL()){
        embed.setThumbnail(client.user.avatarURL()!)
    }
    for(const command of commands) {
        embed.addField(":ice_cube: " + command.name, command.description)
    }
    await msg.reply({embeds: [embed]})

}
