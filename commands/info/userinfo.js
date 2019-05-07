/* eslint-disable no-useless-escape */
const moment = require('moment-timezone');

module.exports = {
  name: 'userinfo',
  category: 'info',
  description: 'Gives information on the mentioned user. If no one is mentioned, falls back to the author',
  aliases: ['ui'],
  usage: '[@User]',
  args: '[@User] => A valid member of the server. If no one is mentioned, falls back to the author and gives their info',
  async run(client, message, args, Discord) {
    // Setting the variable member to the mentioned user, if no mentioned user, falls back to author
    const member = message.mentions.members.first() || message.member;

    let roles = member.roles.filter(r => r.id !== message.guild.id).map(r => r.name).join(', ');

    if (!roles) {
      roles = 'No Roles';
    }

    let activity = member.presence.status;
    let emoji;

    if (activity === 'online') {
      emoji = client.emojis.find(e => e.name === 'online');
      activity = `${emoji} Online`;
    }
    if (activity === 'idle') {
      emoji = client.emojis.find(e => e.name === 'idle');
      activity = `${emoji} Idle`;
    }
    if (activity === 'dnd') {
      emoji = client.emojis.find(e => e.name === 'dnd');
      activity = `${emoji} Do Not Disturb`;
    }
    if (activity === 'offline') {
      activity = 'Offline/Invisible';
    }

    // Userinfo embed
    const embed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setColor('#4199c2')
      .setTimestamp()
      .setTitle(`${member.displayName}\'s Info`)
      .setThumbnail(member.user.displayAvatarURL)
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .addField('ID', member.user.id, true)
      .addField('Nickname', member.displayName, true)
      .addField('Account Created', moment(message.member.user.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'), true)
      .addField(`Joined *${message.guild.name}* `, moment(member.joinedAt).tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'), true)
      .addField('Roles', roles, true)
      .addField('Status', activity, true);

    return message.channel.send(embed);
  },
};
