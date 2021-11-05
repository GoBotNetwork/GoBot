import { Message } from "discord.js";
import { client } from "..";

module.exports = {
  name: "uptime",
  description: "sends the bots uptime",
  execute(message: Message) {
    if (client.uptime) {
      let totalSeconds = client.uptime / 1000;
      let days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.floor(totalSeconds % 60);

      message.reply(
        `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`
      );
    }
  },
};
