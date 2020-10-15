// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  // Parse from args the amount of messages to purge
  const deleteCount = parseInt(args[0], 10);

  // If delete count is nonexistent, less than 1 or greater than 100, error on invalid value
  if (!deleteCount || deleteCount < 1 || deleteCount > 100) {
    return message.error('Invalid Number of Messages to Purge!', "Please provide a number **between 1 and 100** for the number of messages to delete! I wish it could be more but Discord's API doesn't allow that...");
  }

  // Purge the messages
  // If an error is caught, error on purge failed
  return message.channel.bulkDelete(deleteCount)
    .catch((error) => message.error('Purge Failed!', `Couldn't delete messages because: \`${error}\``));
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'Mod',
  args: 1,
};

module.exports.help = {
  name: 'purge',
  category: 'moderation',
  description: 'Purges the stated number of messages in a channel',
  usage: 'purge <number>',
  details: "<number> => From 1-100. I wish it could be more but Discord's API doesn't allow that...",
};
