import { MessageEmbed } from "discord.js";
import { GoUser, allItems } from "@gobot/database";
import { Command } from "../../utils/Command";

const cmd = new Command({
  name: "inventory",
  description: "View your inventory.",
  category: "economy",
  aliases: ["inv"],
  async execute(msg, args) {
    let target;
    if (args.length === 0) {
      target = msg.author;
    } else {
      target = msg.mentions.users.first();
    }

    if (target === undefined) {
      await msg.reply("Invalid Target");
      return;
    }

    const user = await GoUser.toGoUser(target.id);

    const embed = new MessageEmbed();
    embed.setColor("#528B8B");
    embed.setTitle(`:school_satchel: Inventory of ${target.username}`);
    if (target?.avatarURL()) {
      embed.setThumbnail(target.avatarURL()!);
    }

    for (let i = 0; i < user.items.length; i++) {
      const item = allItems[i];
      embed.addField(item.name, user.items[i].toString());
    }
    await msg.reply({ embeds: [embed] });
  },
});

export default cmd;
