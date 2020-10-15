// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  // Ensure the factionSettings object exists
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  // Define a helper method to check if a string is uppercase
  const isUpperCase = (string) => /^[A-Z_0-9]*$/.test(string);
  // Find the character in the factionSettings object
  const character = isUpperCase(factionSettings.chars.find((f) => f.toLowerCase() === args.join(' ').toLowerCase())) ? args.join(' ').toUpperCase() : args.join(' ').toProperCase();

  // If the character exists
  if (factionSettings.chars.includes(character)) {
    // Find the index of the character in the chars array to find its respective role in the roles array
    const char = factionSettings.chars.indexOf(character);
    const charRole = factionSettings.roles[char];
    // Find the role that corresponds with the character provided
    const role = message.guild.roles.cache.find((r) => r.name === charRole);

    // If the author already has the role for the provided character, error on faction already chosen
    // If the author doesn't have the role, has a different fction role, and team switch is disabled, error on no team switching
    if (message.member.roles.cache.has(role.id)) {
      message.error("You've Already Chosen This Faction!", `You've already chosen **${character}** as your faction!`);
    } else if (message.member.roles.cache.some((r) => factionSettings.roles.includes(r.name)) && !factionSettings.teamSwitch) {
      message.error('No Team Switching!', 'Team Switching has been **disabled!** Stick to your guns and help your faction win!');
    } else {
      // If team switch is enabled and there is another faction role to remove, find it and remove it. Error to the console if an error is caught
      const roleToRemove = message.member.roles.cache.filter((r) => factionSettings.roles.includes(r.name)).find((r) => r.name !== role.name);
      if (roleToRemove) {
        message.member.roles.remove(roleToRemove).catch(console.error);
      }

      // Find the emoji of the character if one eixsts
      const emoji = factionSettings.emoji[char] ? client.emojis.cache.find((e) => e.name === factionSettings.emoji[char]) : '';

      // Add the character role to the author, display a success message, and delete the initial message
      // If an error is caught, error to the console
      message.member.roles.add(role)
        .then(() => {
          message.success('Success!', `${message.author} has successfully joined **${character}**! ${emoji}`);
          message.delete().catch(console.error);
        })
        .catch(console.error);
    }
  } else {
    // If the character provided is not found, error on invalid character
    message.error('Invalid Character!', `Valid characters include: **${factionSettings.chars.join('**, **')}**`);
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
