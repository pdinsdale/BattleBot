// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level, Discord) => {
  // Ensure the factionSettings object exists in the Enmap
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);
  // Define total as 0
  let total = 0;

  // Build the initial faction standings embed
  const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTimestamp()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'gif' }))
    .setTitle('Faction Standings');

  // For each char in the chars array, find the role it corresponds to, find the member count of that role, add that information to the embed and increase the total
  const { chars } = factionSettings;
  for (let i = 0; i < chars.length; i++) {
    const role = message.guild.roles.cache.find((r) => r.name === factionSettings.roles[i]);
    embed.addField(chars[i], `\`${role.members.size} members\`\n\`${factionSettings.oneups[chars[i]]} 1-Ups\``, true);
    total += role.members.size;
  }

  // Set the embed footer to the total amount of members and send the embed
  embed.setFooter(`Total: ${total} members`);
  message.channel.send(embed);
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
