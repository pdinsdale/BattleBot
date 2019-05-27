/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
const Discord = require('discord.js');
const eco = require('discord-economy');

const cooldowns = new Discord.Collection();

module.exports = (client, message) => {
  // Send a messsage to the user's DM if the client detects a message from there
  if (message.channel.type === 'dm') {
    return message.author.send('I do **NOT** respond to commands in DMs! Please go to <#355186664869724161> in 1-Up World to use my commands!').catch(console.error);
  }

  // Ignore all bots
  if (message.author.bot) {
    return;
  }

  // Blacklist so no stupid spam bot can wreak havoc on 1-Up World
  client.blacklisted.ensure(message.guild.id, []);

  const blacklist = client.blacklisted.get(message.guild.id);

  // eslint-disable-next-line no-restricted-syntax
  for (const i in blacklist) {
    if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) {
      if (!message.member.kickable) {
        message.delete();
        console.log(`Unable to kick ${message.author.tag} because of missing permissions`);
      } else {
        message.delete();
        message.member.kick('Spam Bot / Raider');
      }
    }
  }

  // When bot is mentioned, display this message
  if (message.isMentioned(client.user)) {
    if (message.channel.id === '355186664869724161') {
      message.channel.send(`Hey ${message.author}! I'm ${client.user}, a bot made by <@${client.config.ownerID}> for the 1-Up World Discord server! I mainly handle Faction Battle stuff along with distributing roles but I've got other fun commands! Use \`.help\` to see a full list! Remember to ping or DM Phoenix with any questions, comments, or feedback!`);
    } else {
      return;
    }
  }

  const guildConfig = client.settings.ensure(message.guild.id, client.defaultSettings);
  client.guildConfig = guildConfig;

  // Ignore messages not starting with the prefix
  if (message.content.indexOf(client.guildConfig.prefix) !== 0) {
    return;
  }

  // Our standard argument/command name definition.
  const args = message.content.slice(client.guildConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data and aliases from the client.commands Enmap
  const cmd = client.commands.get(command) || client.commands.find(cm => cm.aliases && cm.aliases.includes(command));

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) {
    return;
  }

  // If user doesn't have proper permissions, do this stuff
  if (cmd.modonly && !message.member.roles.some(r => [client.guildConfig.modrole].includes(r.name))) {
    if (message.author.id !== message.guild.owner.id) {
      return message.reply('You need to have the Moderator role to use this!');
    }
  }
  if (cmd.owneronly && message.author.id !== client.config.ownerID) {
    return;
  }
  if (cmd.no1uw && message.guild.id === '355119082808541184') {
    return;
  }
  if (cmd.enabled === false) {
    if (message.author.id !== client.config.ownerID) {
      return message.reply('This command is currently disabled!');
    }
  }

  if (!cooldowns.has(cmd.name)) {
    cooldowns.set(cmd.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(cmd.name);
  const cooldownAmount = (cmd.cooldown || 0) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      let timeLeft = (expirationTime - now) / 1000;
      let time = 'second(s)';
      if (cmd.cooldown > 60) {
        timeLeft = (expirationTime - now) / 60000;
        time = 'minute(s)';
      }
      return message.reply(`Please wait **${timeLeft.toFixed(1)} more ${time}** before reusing the \`${cmd.name}\` command!`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Run the command
  cmd.run(client, message, args, Discord, eco).then(() => {
    if (cmd.category !== 'economy' || cmd.owneronly) {
      console.log(`**${message.author.tag}** ran cmd \`${cmd.name}\` in **${message.guild.name}**`);
    }
  });
};
