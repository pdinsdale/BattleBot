// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  // Find the Brick Block role
  const role = message.guild.roles.cache.find((r) => r.name === 'Brick Block');

  // Sets the member to the user mentioned
  const member = message.mentions.members.first();

  // If no user mentioned, error on invalid member
  if (!member) {
    return message.error('Invalid Member!', 'Please mention a valid member of this server');
  }

  // Adds the Brick Block role to the member, deletes the message that initiated the command, and sends the author a dm confirming the mute
  member.roles.add(role).catch(console.error);
  message.delete().catch(console.error);
  return message.author.send(`Successfully muted ${member}!`).catch(console.error);
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'Mod',
  args: 1,
};

module.exports.help = {
  name: 'mute',
  category: 'moderation',
  description: 'Gives the mentioned user the Brick Block role',
  usage: 'mute <@user>',
  details: '<@user> => Any valid member of the server',
};
