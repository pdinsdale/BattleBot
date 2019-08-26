// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, [character], level) => {
  // eslint-disable-next-line max-len
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  if (factionSettings.fans.enabled) {
    if (factionSettings.fans.fanChars.includes(character)) {
      const role = message.guild.roles.find((r) => r.name === `${character} Fan`);

      message.member.addRole(role)
        .then(() => {
          message.success('Success!', `You've successfully joined **${character}**'s Fans!`);
          message.delete().catch(console.error);
        })
        .catch((err) => {
          message.error('Error!', `Something's a wack! Contact **${client.fetchOwner().tag}** for further details!`);
          console.error(err);
        });
    } else {
      message.error('Invalid Fan Character!', `Valid fan characters include: **${factionSettings.fans.fanChars.join('**, **')}**`);
    }
  } else if (factionSettings.factions.factionChars.includes(character)) {
    const char = factionSettings.factions.factionChars.indexOf(character.toProperCase());
    const charRole = factionSettings.factions.factionRoles[char];
    const role = message.guild.roles.find((r) => r.name === charRole);

    message.member.addRole(role)
      .then(() => {
        message.success('Success!', `You've successfully joined **${character}**!`);
        message.delete().catch(console.error);
      })
      .catch((err) => {
        message.error('Error!', `Something's a wack! Contact **${client.fetchOwner().tag}** for further details!`);
        console.error(err);
      });
  } else {
    message.error('Invalid Character!', `Valid characters include: **${factionSettings.factions.factionChars.join('**, **')}**`);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  args: 1,
};

module.exports.help = {
  name: 'join',
  category: 'roles',
  description: 'Joins the specified faction/fan',
  usage: 'join <character>',
  details: '<character> => One of the current characters available to join',
};
