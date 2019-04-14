const moment = require('moment-timezone');
const { version } = require('discord.js');

module.exports = {
  name: 'botinfo',
  category: 'info',
  description: 'Gives information on the bot',
  aliases: ['bi'],
  usage: ' ',
  async run(client, message, args, Discord) {
    // Turning uptime milliseconds into normal seconds
    const totalSeconds = (client.uptime / 1000);

    // Math for days, hours, and minutes
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);

    // If something = 1 don't make it plural
    const daysP = (days === 1) ? 'day' : 'days';
    const hoursP = (hours === 1) ? 'hour' : 'hours';
    const minutesP = (minutes === 1) ? 'minute' : 'minutes';

    // Set uptime
    const uptime = `${days} ${daysP}, ${hours} ${hoursP}, and ${minutes} ${minutesP}`;

    // Botinfo embed
    const embed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setTitle('Bot Information')
      .setColor('#4199c2')
      .setTimestamp()
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setThumbnail(client.user.displayAvatarURL)
      .addField('Bot Name', client.user.username, true)
      .addField('Bot ID', client.user.id, true)
      .addField('Bot Owner', 'Phoenix#0408', true)
      .addField('Bot Version', client.version, true)
      .addField('Online Users', client.users.size, true)
      .addField('Server Count', client.guilds.size, true)
      .addField('Uptime', uptime, true)
      .addField('Discord.js Version', `v${version}`, true)
      .addField('Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
      .addField('Node.js Version', `${process.version}`, true)
      .addField('Created On', moment(client.user.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'), true);

    return message.channel.send(embed);
  },
};
