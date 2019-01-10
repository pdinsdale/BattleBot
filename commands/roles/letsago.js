module.exports = { name: 'command-name', async run(client, message, args) {

    if (message.author.id !== client.config.ownerID) return;

    let role = message.guild.roles.find(role => role.name === "Verified");

    if (message.member.roles.has(role.id)) {

        message.reply('You\ve already been verified!');
        message.delete();
    } else {

        message.member.addRole(role).catch(console.error);
        message.channel.send(`${message.author} has been verfied!`);
        message.delete();
    }
}};