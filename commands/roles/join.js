// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  // eslint-disable-next-line max-len
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  const owner = await client.fetchOwner();

  const character = args.joi(' ');

  if (factionSettings.fans.enabled) {
    if (factionSettings.fans.fanChars.includes(character.toProperCase())) {
      const role = message.guild.roles.find((r) => r.name === `${character} Fan`);

      message.member.addRole(role)
        .then(() => {
          message.success('Success!', `You've successfully joined **${character}**'s Fans!`);
          message.delete().catch(console.error);
        })
        .catch((err) => {
          message.error('Error!', `Something's a wack! Contact **${owner.tag}** for further details!`);
          console.error(err);
        });
    } else {
      message.error('Invalid Fan Character!', `Valid fan characters include: **${factionSettings.fans.fanChars.join('**, **')}**`);
    }
  } else if (factionSettings.factions.factionChars.includes(character.toProperCase())) {
    const char = factionSettings.factions.factionChars.indexOf(character.toProperCase());
    const charRole = factionSettings.factions.factionRoles[char];
    const role = message.guild.roles.find((r) => r.name === charRole);

    if (message.member.roles.has(role.id)) {
      message.error("You've Already Chosen This Faction!", `You've already chosen **${character.toProperCase()}** as your faction!`);
    } else if (message.member.roles.some((r) => factionSettings.factions.factionRoles.includes(r.name)) && !factionSettings.factions.teamSwitch) {
      message.error('No Team Switching!', 'Team Switching has been **disabled!** Stick to your guns and help your faction win!');
    } else {
      const roleToRemove = message.member.roles.filter((r) => factionSettings.factions.factionRoles.includes(r.name)).find((r) => r.name !== role.name);

      if (roleToRemove) {
        message.member.removeRole(roleToRemove).catch(console.error);
      }

      const emoji = factionSettings.factions.factionEmoji[char] ? client.emojis.find((e) => e.name === factionSettings.factions.factionEmoji[char]) : '';

      message.member.addRole(role)
        .then(() => {
          message.success('Success!', `${message.author} has successfully joined **${character.toProperCase()}**! ${emoji}`);
          message.delete().catch(console.error);
        })
        .catch((err) => {
          message.error('Error!', `Something's a wack! Contact **${owner.tag}** for further details!`);
          console.error(err);
        });
    }
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
