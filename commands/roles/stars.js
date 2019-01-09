module.exports = { name: 'command-name', async run(client, message, args) {

    let faction1 = message.guild.roles.find(role => role.name === "Koopa Quickster");
    let faction2 = message.guild.roles.find(role => role.name === "Masked Marathoner");

    if (message.member.roles.has(faction2.id)) message.member.removeRole(faction2).catch(console.error);

    if (message.member.roles.has(faction1.id)) {
        
        message.reply('You already chose that faction!');
    } else {

        message.member.addRole(faction1).catch(console.error);
        message.channel.send(`${message.author} has joined **${client.faction1}!**`);
        message.delete();
    }
}};