const Discord = require('discord.js');
const _ = require('lodash');
const moment = require('moment');
const tz = require('moment-timezone');

module.exports = { name: 'command-name', async run(client, message, args) {

    let totalSeconds = (client.uptime / 1000);

    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = _.parseInt(totalSeconds / 3600) % 24;
    let minutes = _.parseInt(totalSeconds / 60) % 60;
    let seconds = Math.floor(totalSeconds % 60);
    days = days > 9 ? days : '0' + days
    hours = hours > 9 ? hours : '0' + hours
    minutes = minutes > 9 ? minutes : '0' + minutes
    seconds = seconds > 9 ? seconds : '0' + seconds

    let uptime = `${days} days, ${hours} hours, and ${minutes} minutes`;

    let embed = new Discord.RichEmbed()
        .setAuthor(message.member.user.tag, message.author.avatarURL)
        .setTitle('Bot Information')
        .setColor('#4199c2')
        .setTimestamp()
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .setThumbnail(client.user.displayAvatarURL)
        .addField('Bot Name', client.user.username)
        .addField('Bot ID', client.user.id)
        .addField('Bot Version', client.version)
        .addField('Created On', moment(client.user.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'))
        .addField('Member/Client Count', client.users.size)
        .addField('Server Count', client.guilds.size)
        .addField('Uptime', uptime);

        return message.channel.send(embed);
}};