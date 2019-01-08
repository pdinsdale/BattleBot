module.exports = { name: 'command-name', async run(client, message, args) {

    if (message.author.id !== client.config.ownerID) return;

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    // Getting Faction Messages
    const key = message.guild.id;

    let f1Me = client.messages.get(key, "faction1M");
    let f2Me = client.messages.get(key, "faction2M");

    // Displaying the Message
    message.channel.send(`**${client.faction1} Messages: **\`${f1Me}\`\n**${client.faction2} Messages: **\`${f2Me}\``);
}};