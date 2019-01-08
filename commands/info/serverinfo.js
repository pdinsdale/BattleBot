const Discord = require('discord.js');
const moment = require('moment');
const tz = require('moment-timezone');

module.exports = { name: 'command-name', async run(client, message, args) {
    

    let embed = new Discord.RichEmbed()
        .setAuthor(message.member.user.tag, message.author.avatarURL)
        .setTitle('Server Information')
        .setColor('#4199c2')
        .setTimestamp()
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .setThumbnail(message.guild.iconURL)
        .addField('Server Name', message.guild.name)
        .addField('Server ID', message.guild.id)
        .addField('Server Owner', message.guild.owner.user.tag)
        .addField('Created On', moment(message.guild.createdAt).tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a z'))
        .addField('Member Count', message.guild.memberCount)
        .addField('Current Faction Battle', `**${client.faction1}** vs. **${client.faction2}**`);

        return message.channel.send(embed);
}};