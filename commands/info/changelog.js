/* eslint-disable no-useless-escape */
module.exports = {
  name: 'changelog',
  description: 'Gives information on the latest update to BattleBot: v1.1.3',
  aliases: ['change', 'ch'],
  usage: ' ',
  async run(client, message, args, Discord) {
    // Changelog embed
    const rEmbed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setTitle('BattleBot Change Log')
      .setDescription(`All the information of the latest update to BattleBot: ${client.version}! Remember to ping or DM Phoenix#0408 with any questions, comments, or feedback!`)
      .setColor('#4199c2')
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL)
      .addField('Added command aliases!', "For everyone that can't spell command names correctly, here's the fix!")
      .addField('Added a more dynamic help command!', 'Now you can use \`.help [command name]\` to see more info about that command!')
      .addField('Added a message when the bot is mentioned!', "For everyone that doesn't read announcements about the bot, here ya go!")
      .addField('Fixed minor bugs with commands!', 'Those pesky bugs are now eradicated!')
      .addField('Fixed minor graphical bugs within embeds!', 'Now they look as beautiful as ever!')
      .addField('Refactored the code!', "You guys don't see this part of the update but trust me it makes my job 10x easier!");
    return message.channel.send(rEmbed);
  },
};
