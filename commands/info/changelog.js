const Discord = require('discord.js');

module.exports = { name: 'command-name', async run(client, message, args) {

    if (!args[0]) {
    const rEmbed = new Discord.RichEmbed()
        .setAuthor(message.member.user.tag, message.author.avatarURL)
        .setTitle('BattleBot Change Log')
        .setDescription(`All the information of the latest update to BattleBot: ${client.version}! Remember to ping or DM Phoenix#0408 with any questions, comments, or feedback!`)
        .setColor('#4199c2')
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL)
        .addField('Added the changelog command!', 'As you can see if you\'re viewing this!')
        .addField('Enabled the slots command!', 'Use \`.slots\` to play a quick game of slots because why not!')
        .addField('Fixed a bug with \`.botinfo\` not showing the correct uptime!', '0 days and 26 hours... of course that makes sense...')
        .addField('Updated the faction role commands!', 'The commands that give the user a faction role now deletes the user\'s message, making the channels less cluttered!')
        .addField('Updated the \`.results\`!', 'Now December 2018\'s results are viewable!')
        .addField('Added the \`.smashbros\` command!', 'Use this command to be given the Frequent Fighter role!')
        .addField('Fixed minor bugs with commands!', 'Those pesky bugs are now eradicated!')
        .addField('Fixed minor graphical bugs within embeds!', 'Now they look as beautiful as ever!')
        .addField('Refactored the code!', 'You guys don\'t see this part of the update but trust me it makes my job 10x easier!');
    message.channel.send(rEmbed);
    }
}};