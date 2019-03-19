const moment = require('moment-timezone');
const { version } = require('discord.js');

module.exports = {
  name: 'botinfo',
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

    let daysM = 'days';
    let hoursM = 'hours';
    let minutesM = 'minutes';

    // If something = 1 don't make it plural
    if (days === 1) {
      daysM = 'day';
    }
    if (hours === 1) {
      hoursM = 'hour';
    }
    if (minutes === 1) {
      minutesM = 'minute';
    }

    // Set uptime
    const uptime = `${days} ${daysM}, ${hours} ${hoursM}, and ${minutes} ${minutesM}`;

    // Botinfo embed
    const embed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setTitle('Bot Information')
      .setColor('#4199c2')
      .setTimestamp()
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setThumbnail(client.user.displayAvatarURL)
      .addField('Bot Name', client.user.username)
      .addField('Bot ID', client.user.id)
      .addField('Bot Owner', `Phoenix#0408 (${client.config.ownerID})`)
      .addField('Bot Version', client.version)
      .addField('Created On', moment(client.user.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'))
      .addField('Online Users', client.users.size)
      .addField('Server Count', client.guilds.size)
      .addField('Uptime', uptime)
      .addField('Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
      .addField('Discord.js Version', `v${version}`)
      .addField('Node.js Version', `${process.version}`);

    return message.channel.send(embed);
  },
};
