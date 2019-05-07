const moment = require('moment-timezone');

module.exports = {
  name: 'serverinfo',
  category: 'info',
  description: 'Gives information on the server',
  aliases: ['si'],
  usage: ' ',
  async run(client, message, args, Discord) {
    // Serverinfo embed
    const embed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setTitle('Server Information')
      .setColor('#4199c2')
      .setTimestamp()
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setThumbnail(message.guild.iconURL)
      .addField('Server Name', message.guild.name, true)
      .addField('Server ID', message.guild.id, true)
      .addField('Server Owner', `${message.guild.owner.user.tag} (${message.guild.owner.user.id})`, true)
      .addField('Created On', moment(message.guild.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'), true)
      .addField('Member Count', message.guild.memberCount, true);

    return message.channel.send(embed);
  },
};
