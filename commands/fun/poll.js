const Discord = require('discord.js');

module.exports = { name: 'poll', async run(client, message, args) {

    // No mod role, no execution of command
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");
    
    // If no args[0], display this
    if(!args[0]) return message.reply(`Proper Usage: \`${client.config.prefix}poll [Question]\``);

    // Settig embed
    const embed = new Discord.RichEmbed()
        .setColor('#4199c2')
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`)
        .setTimestamp()
        .setDescription('React to vote!')
        .setTitle(args.join(' '));

    // Sending message with an await and then reacting to it
    let msg = await message.channel.send(embed);
    await msg.react('✅');
    await msg.react('❌');

    // Delete original message sent by user
    message.delete({timeout: 1000});
}};