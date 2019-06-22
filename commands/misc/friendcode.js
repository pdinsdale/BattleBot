/* eslint-disable no-useless-escape */
const emoji = require('../../src/emoji');

module.exports = {
  name: 'friendcode',
  category: 'misc',
  description: 'Controls the friendcode db',
  aliases: ['fc'],
  usage: '[code|@member|delete]',
  args: '[code|@member|delete] => Your code to add to the db or the mention of a member to show their fc. If delete, deletes your fc from the db',
  async run(client, message, args, Discord) {
    const member = message.mentions.members.first() || message.member;

    const embed = new Discord.RichEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL)
      .setTitle(`${member.displayName}'s Friend Code`)
      .setColor('#4199c2')
      .setTimestamp()
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL);

    const fc = client.friendCodes.ensure(message.author.id, []);

    if (member === message.mentions.members.first()) {
      const memberFC = client.friendCodes.get(member.user.id);
      if (!memberFC[0]) {
        return message.reply('That user has not set their friend code!');
      }
      embed.setDescription(`**${memberFC}**`);

      return message.channel.send(embed);
    }

    if (!args[0]) {
      if (!fc[0]) {
        return message.reply('You have not set a friend code! You can do so by running \`.fc [code]\`!');
      }

      embed.setDescription(`**${fc}**`);
      return message.channel.send(embed);
    }

    if (args[0] === 'delete') {
      client.friendCodes.delete(message.author.id);
      return message.channel.send(`**${message.member.displayName}**, Successfully deleted your friend code! You can set it again by running \`.fc [code]\`!`);
    }

    const code = args[0].toUpperCase();

    if (code.length !== 17 || code.charAt(0) !== 'S' || code.charAt(1) !== 'W' || code.charAt(2) !== '-' || code.charAt(7) !== '-' || code.charAt(12) !== '-') {
      return message.channel.send(`${emoji.redX} **Invalid Code!** Please check to see if the code was typed correctly and include all dashes and \`SW\` at the beginning!`);
    }

    if (fc[0]) {
      return message.reply('You already have a friend code set! You can delete it by running \`.fc delete\`!');
    }

    client.friendCodes.push(message.author.id, code);
    embed.setDescription(`Successfully set your friend code!\n**${code}**`);

    return message.channel.send(embed);
  },
};
