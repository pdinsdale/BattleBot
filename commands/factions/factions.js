module.exports = {
  name: 'factions',
  category: 'factions',
  description: 'Displays the current amount of users in each faction as well as how many 1-Ups each faction has',
  aliases: ['f', 'faction'],
  usage: ' ',
  modonly: true,
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Getting size of both faction roles
    const roleID1 = client.roleFind(message, client.guildConfig.faction1Role).id;
    const memWF1 = client.roleGet(message, roleID1).members;

    const roleID2 = client.roleFind(message, client.guildConfig.faction2Role).id;
    const memWF2 = client.roleGet(message, roleID2).members;

    // Getting the 1-ups data from the Enmap
    const f1ups = client.oneups.get(message.guild.id, 'faction1ups');
    const f2ups = client.oneups.get(message.guild.id, 'faction2ups');

    // Displaying the message
    message.channel.send(`**${client.guildConfig.faction1}:** \n\`${memWF1.size} members\` \n\`${f1ups} 1-Ups\` \n\n**${client.guildConfig.faction2}:** \n\`${memWF2.size} members\` \n\`${f2ups} 1-Ups\``);
  },
};
