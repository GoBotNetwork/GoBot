import { Command } from "../../utils/commandTypes";
import { Message } from "discord.js";
import { toGoUser } from "../../db/entities/GoUser";
import { allItems } from "../../utils/item";
import { maxwords } from "../../utils/maxwords";

const cmd = new Command({
  name: "sell",
  description: "sells the specified item",
  category: "economy",
  usage: "sell [item] <amount>",
  async execute(msg: Message, args: string[]) {
    if (args.length < 1) {
      await msg.reply("Please provide an Item to Sell!");
      return;
    }
    const itemname = args[0];

    let ore;
    let oreIndex = 0;
    for (const item of allItems) {
      if (item.name.toLocaleLowerCase() === itemname.toLocaleLowerCase()) {
        ore = item;
        break;
      }
      oreIndex++;
    }
    if (ore === undefined) {
      await msg.reply("Item not found");
      return;
    }

    const gouser = await toGoUser(msg.author.id);

    let amount;
    if (args[1]) {
      if (maxwords.includes(args[1].toLowerCase())) {
        amount = gouser.items[oreIndex];
      } else {
        amount = parseInt(args[1]);
      }
    } else {
      amount = 1;
    }

    if (gouser.items[oreIndex] > amount - 1) {
      gouser.items[oreIndex] -= amount;
      gouser.handBalance += ore.price * amount;
      await gouser.save();
      await msg.reply(
        `Succesfully sold ${amount} ${ore.name} for ${ore.price * amount}`
      );
    } else {
      await msg.reply("You don't own that");
    }
  },
});

module.exports = cmd;
