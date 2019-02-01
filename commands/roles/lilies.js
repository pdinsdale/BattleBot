module.exports = { name: 'command-name', async run(client, message, args) {

    let faction1 = message.guild.roles.find(role => role.name === "Petal Plumber");
    let faction2 = message.guild.roles.find(role => role.name === "Fearful Florist");

    if (message.member.roles.has(faction1.id)) message.member.removeRole(faction1).catch(console.error);

    if (message.member.roles.has(faction2.id)) {
        
        message.reply('You already chose that faction!');
    } else {

        message.member.addRole(faction2).catch(console.error);
        message.channel.send(`${message.author} has joined **${client.faction2}** in his effort to make the most beautiful bouquet for Princess Daisy!`);
        message.delete();
    }
}};