module.exports = { name: 'lilies', aliases: ['lillies', 'liles', 'lilles', 'lilllies'], async run(client, message, args) {

    let faction1 = message.guild.roles.find(role => role.name === "Petal Plumber");
    let faction2 = message.guild.roles.find(role => role.name === "Fearful Florist");

    if (message.member.roles.has(faction1.id)) message.member.removeRole(faction1).catch(err => console.log(err));

    if (message.member.roles.has(faction2.id)) {
        
        message.reply('You already chose that faction!');
    } else {

        message.member.addRole(faction2).catch(err => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID} screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        message.channel.send(`${message.author} has joined **${client.faction2}** in his effort to make the most beautiful bouquet for Princess Daisy!`);
        message.delete().catch(err => console.log(err));
    }
}};