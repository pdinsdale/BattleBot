module.exports = { name: 'marigolds', description: 'Gives the author the faction role for Mario', aliases: ['mariogolds', 'marigold', 'mariogold'], usage: ' ', modonly: false, async run(client, message, args) {

    // Sets factions to the roles
    let faction1 = message.guild.roles.find(role => role.name === "Petal Plumber");
    let faction2 = message.guild.roles.find(role => role.name === "Fearful Florist");

    // If user has the other faction role, remove it
    if (message.member.roles.has(faction2.id)) message.member.removeRole(faction2).catch(err => console.log(err));

    // If they already have the faction role, display this
    if (message.member.roles.has(faction1.id)) {
        
        message.reply('You already chose that faction!');
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(faction1).catch(err => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID} screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **${client.faction1}** in his effort to make the most beautiful bouquet for Princess Peach!`);
        message.delete().catch(err => console.log(err));
    }
}};