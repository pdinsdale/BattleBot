// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, [value], level) => {
  // Ensure the guild has a blacklist in the Enmap
  client.blacklist.ensure(message.guild.id, []);

  // Ensure the value is a string, escaping links
  value.toString();

  // Pushes args[0] to the blacklist Enmap, logs it, and displays a success message
  client.blacklisted.push(message.guild.id, value);
  console.log(`${message.author.tag} added ${value} to ${message.guild.name}'s blacklist!\nBlacklist: ${client.blacklisted.get(message.guild.id)}`);
  return message.success('Successfully Added to the Blacklist!', 'Any member who uses this word/phrase/link will be automatically kicked!');
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['bl'],
  permLevel: 'Mod',
  args: 1,
};

module.exports.help = {
  name: 'blacklist',
  category: 'moderation',
  description: 'Blacklists the given word/phrase/link. Any member who uses a blacklisted item will be automatically kicked.',
  usage: 'blacklist <word|phrase|link>',
  details: '<word|phrase|link> => Any word, phrase, or link you wish to blacklist',
};
