module.exports = {
    name: "poll",
    description: "Creates a 2-reaction poll for the provided Yes-or-No question",
    usage: "[Question]",
    args: "[Question] => Any Yes-or-No question",
    modonly: true,
    async run(client, message, args, Discord) {

    // If no args[0], display this
    if(!args[0]) return message.reply(`Proper Usage: \`${client.guildConfig.prefix}poll [Question]\``);

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