const Discord = require('discord.js');

module.exports = { name: 'command-name', async run(client, message, args) {

    const rEmbed = new Discord.RichEmbed()
        .setAuthor(message.member.user.tag, message.author.avatarURL)
        .setTitle('BattleBot Change Log')
        .setDescription(`All the information of the latest update to BattleBot: ${client.version}! Remember to ping or DM Phoenix#0408 with any questions, comments, or feedback!`)
        .setColor('#4199c2')
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL)
        .addField('Added the 1-Ups database!', 'An easy way to keep track of each factions\' 1-Ups!')
        .addField('Added a message when the bot is mentioned!', 'For everyone that doesn\'t read announcements about the bot, here ya go!')
        .addField('Added \`.setnickname\` and \`.setavatar\`!', 'Making the mods\' lives easier is always a plus!')
        .addField('Fixed a bug with \`.botinfo\` not showing the correct uptime!', '0 days and 26 hours... of course that makes sense...')
        .addField('Fixed minor bugs with commands!', 'Those pesky bugs are now eradicated!')
        .addField('Fixed minor graphical bugs within embeds!', 'Now they look as beautiful as ever!')
        .addField('Refactored the code!', 'You guys don\'t see this part of the update but trust me it makes my job 10x easier!');
    message.channel.send(rEmbed);

}};