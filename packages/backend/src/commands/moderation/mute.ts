import { Command } from "../../utils/commandTypes";
import {
  adminPerms,
  hasPermission,
  memberPerms,
  messagePerms,
} from "../../utils/GuildPermissions";
import { Guild, MessageEmbed, TextChannel } from "discord.js";
import { client } from "../../utils/client";

export const rolename = "gomuted";

const cmd = new Command({
  name: "mute",
  description: "Mutes a Member",
  category: "moderation",
  usage: "mute [@member] <reason>",
  permissions: memberPerms,
  execute: async (msg, args) => {
    const guild = msg.guild;
    if (!guild) return;

    const target = msg.mentions.users.first();

    if (!target) {
      await msg.reply("Please provide a valid member");
      return;
    }

    const targetMember = guild.members.cache.find(
      (u) => u.id == msg.mentions.users.first()!.id
    );

    if (!targetMember) return;

    if (
      target.id == msg.author.id ||
      hasPermission(targetMember!, memberPerms, messagePerms, adminPerms)
    ) {
      await msg.reply("You cannot mute a Moderator!");
      return;
    }

    if (targetMember.roles.cache.find((r) => r.name == rolename)) {
      await msg.reply("That member is already muted!");
      return;
    }

    let mutedRole;

    if (!(await roleExists(guild))) {
      mutedRole = await createMutedRole(guild);
    } else {
      mutedRole = guild.roles.cache.find((r) => r.name == rolename);
    }

    await targetMember.roles.add(mutedRole!);

    let reason = "";
    if (args.length > 1) {
      for (let i = 1; i < args.length; i++) {
        reason += args[i] + " ";
      }
    }
    await msg.reply({
      embeds: [muteEmbed(target.username, reason ? reason : "None")],
    });
  },
});

export async function getMutedRole(guild: Guild) {
  if (await roleExists(guild)) {
    return guild.roles.cache.find((role) => role.name == rolename);
  } else {
    return await createMutedRole(guild);
  }
}

export async function roleExists(guild: Guild) {
  return guild.roles.cache.some((r) => r.name == rolename);
}

export async function createMutedRole(guild: Guild) {
  const role = await guild.roles.create({ name: rolename, color: "GREY" });
  for (const channel of guild.channels.cache) {
    const [, ch] = channel;
    if (ch instanceof TextChannel) {
      await ch.permissionOverwrites.create(role, { SEND_MESSAGES: false });
    }
  }
  return role;
}

export const muteEmbed = (user: string, reason: string, duration?: string) => {
  const embed = new MessageEmbed()
    .setAuthor(client.user!.username, client.user!.displayAvatarURL())
    .setColor("BLUE")
    .setTitle(`${user} has been muted`)
    .addField("Reason", reason);

  if (duration) {
    embed.addField("Duration", duration);
  }
  return embed;
};

export default cmd;
