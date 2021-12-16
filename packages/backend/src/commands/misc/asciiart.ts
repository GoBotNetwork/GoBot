import { Command } from "@utils/commandTypes";
import figlet from "figlet";
import { logger } from "@utils/logger";


// creates an ascii art from a given string
const cmd = new Command({
  name: "asciiart",
  description: "Creates an ascii art from a given string",
  usage: "asciiart <string>",
  async execute(message, args) {
    // check if args exist
    if (!args[0]) {
      message.reply("Please provide a string to convert to ascii art");
      return;
    }

    const text = args.join(" ");

    // check if the text is too long
    if (text.length > 2000) {
      message.reply("The text is too long to convert to ascii art");
      return;
    }

    // convert the text to ascii art
    const ascii = await new Promise<string>((resolve, reject) => {
      figlet.text(text, {}, (err, res) => {
        if (err) reject(err);
        resolve(res!);
      });
    }
    );

    // send the ascii art
    message.channel.send("```" + ascii + "```");
  },
});

export default cmd;
