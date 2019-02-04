module.exports = { name: 'smashbros', async run(client, message, args) {

    let role = message.guild.roles.find(role => role.name === "Frequent Fighter");

    if (message.member.roles.has(role.id)) {

        message.member.removeRole(role).catch(console.error);
        message.reply('I\'ve removed the **Frequent Fighter** role from you! You will no longer be pinged for future matches!');
        message.delete();
    } else {

        message.member.addRole(role).catch(console.error);
        message.channel.send(`${message.author} has been given the **Frequent Fighter** role! Good luck in your future matches against your fellow fighters!`);
        message.delete();
    }
}};