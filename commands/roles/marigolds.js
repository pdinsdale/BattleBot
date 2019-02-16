module.exports = { name: 'marigolds', description: 'Gives the author the faction role for', aliases: ['mariogolds', 'marigold', 'mariogold'], usage: ' ', modonly: false, async run(client, message, args) {

    // Ensures the data is in the settings Enmap
    const guildConfig = client.settings.ensure(message.guild.id, client.defaultSettings);

    // Sets factions to the roles
    let faction1 = message.guild.roles.find(role => role.name === `${guildConfig.faction1Role}`);
    let faction2 = message.guild.roles.find(role => role.name === `${guildConfig.faction2Role}`);

    // If user has the other faction role, remove it
    if (message.member.roles.has(faction2.id)) message.member.removeRole(faction2).catch(err => console.log(err));

    // If they already have the faction role, display this
    if (message.member.roles.has(faction1.id)) {
        
        message.reply('You already chose that faction!');
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(faction1).catch(err => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **${guildConfig.faction1}** in his effort to make the most beautiful bouquet for Princess Peach!`);
        message.delete().catch(err => console.log(err));
    }
}};