/* eslint-disable no-useless-escape */
const fs = require('fs');

const { version } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
  name: 'changelog',
  category: 'info',
  description: `Gives information on the latest update to BattleBot: v${version}`,
  aliases: ['change', 'ch'],
  usage: ' ',
  async run(client, message, args, Discord) {
    // Changelog embed
    const rEmbed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setTitle('BattleBot Change Log')
      .setDescription(`All the information of the latest update to BattleBot: v${version}! Remember to ping or DM Phoenix#0408 with any questions, comments, or feedback!`)
      .setColor('#4199c2')
      .setFooter(`Created and Maintained by Phoenix#0408 | v${version}`, client.user.displayAvatarURL)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL)
      .addField('Added an Economy!', 'Many new commands and many items to buy!')
      .addField('Updated results command!', "Now using the results command is easier than ever and it's data driven!")
      .addField('Fixed the blacklist!', "Let's hope I don't break it again, heh")
      .addField('Fixed minor bugs with commands!', 'Those pesky bugs are now eradicated!')
      .addField('Fixed minor graphical bugs within embeds!', 'Now they look as beautiful as ever!')
      .addField('Refactored the code!', "You guys don't see this part of the update but trust me it makes my job 10x easier!");
    return message.channel.send(rEmbed);
  },
};
