import { Message, User } from "discord.js";

export type Command = {
  name: string;
  description: string;
  aliases?: string[];
  usage? :string;

  execute: (msg: Message, args: string[]) => void;
};
export type CooldownCommand = Command & {
  cooldown: number;
};

const cooldownMap = new Map<string, Date>();

export const setCooldown = (
  commandName: string,
  userID: string,
  cooldown: number
): void => {
  cooldownMap.set(commandName + userID, new Date());
  setTimeout(() => cooldownMap.delete(commandName + userID), cooldown * 1000);
};

export const canExecute = (commandName: string, userID: string): boolean => {
  return !cooldownMap.has(commandName + userID);
};

export const getCooldown = (
  commandName: string,
  userID: string,
  cooldown: number
): number => {
  return Math.ceil(cooldown - getTimePassed(commandName, userID));
};

export const getTimePassed = (commandName: string, userID: string): number => {
  var lastUsed = cooldownMap.get(commandName + userID);

  if (!lastUsed) return -1;

  const delay = new Date().getTime() - lastUsed.getTime();
  return delay / 1000;
};
