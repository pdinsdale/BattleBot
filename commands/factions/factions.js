module.exports = { name: 'factions', description: 'Displays the current amount of users in each faction as well as how many 1-Ups each faction has', aliases: ['f', 'faction'], usage: ' ', modonly: true, async run(client, message, args) {

    // Ensures the data is in the settings Enmap
    const guildConfig = client.settings.ensure(message.guild.id, client.defaultSettings);

    // Getting size of both faction roles
    let roleID1 = message.guild.roles.find(role => role.name === guildConfig.faction1Role).id;
    let memWF1 = message.guild.roles.get(roleID1).members;

    let roleID2 = message.guild.roles.find(role => role.name === guildConfig.faction2Role).id;
    let memWF2 = message.guild.roles.get(roleID2).members;

    // Getting the 1-ups data from the Enmap
    let f1ups = client.oneups.get(message.guild.id, 'faction1ups');
    let f2ups = client.oneups.get(message.guild.id, 'faction2ups');

    // Displaying the message
    message.channel.send(`**${guildConfig.faction1}:** \n\`${memWF1.size} members\` \n\`${f1ups} 1-Ups\` \n\n**${guildConfig.faction2}:** \n\`${memWF2.size} members\` \n\`${f2ups} 1-Ups\``);

}};