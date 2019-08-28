// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);
  let counts = '';

  if (factionSettings.fans.enabled) {
    const { fanChars } = factionSettings.fans;

    for (let i = 0; i < fanChars.length; i++) {
      const role = message.guild.roles.find((r) => r.name === `${fanChars[i]} Fan`);

      if (!role) {
        message.error('Fans Not Set Properly in Database!', `The fans are not set properly! To fix this, run \`${client.getSettings(message.guild).prefix}set -config\`!`);
        break;
      }

      counts += `**${fanChars[i]}:** \n\`${role.members.size} members\`\n\n`;
    }

    message.channel.send(counts);
  } else {
    const { factions } = factionSettings;
    for (let i = 0; i < factions.factionChars.length; i++) {
      counts += `**${factions.factionChars[i]}:** \n\`${message.guild.roles.find((r) => r.name === factions.factionRoles[i]).members.size} members\`\n\`${factions.oneups[factions.factionChars[i]]} 1-Ups\`\n\n`;
    }

    message.channel.send(counts);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['f', 'faction'],
  permLevel: 'Mod',
};

module.exports.help = {
  name: 'factions',
  category: 'factions',
  description: 'Displays the current amount of users in each faction as well as how many 1-Ups each faction has',
  usage: 'factions',
};
