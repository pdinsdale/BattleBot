module.exports = { name: 'command-name', aliases: ['mariogolds', 'marigold', 'mariogold'], async run(client, message, args) {

    let faction1 = message.guild.roles.find(role => role.name === "Petal Plumber");
    let faction2 = message.guild.roles.find(role => role.name === "Fearful Florist");

    if (message.member.roles.has(faction2.id)) message.member.removeRole(faction2).catch(err => console.log(err));

    if (message.member.roles.has(faction1.id)) {
        
        message.reply('You already chose that faction!');
    } else {

        message.member.addRole(faction1).catch(err => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID} screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        message.channel.send(`${message.author} has joined **${client.faction1}** in his effort to make the most beautiful bouquet for Princess Peach!`);
        message.delete().catch(err => console.log(err));
    }
}};