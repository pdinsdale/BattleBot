// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  // Find the channel mentioned to send the message to
  // If no channel is mentioned, send the provided message to the channel the command was used in
  const channel = message.mentions.channels.first();
  if (!channel) {
    return message.channel.send(args.join(' '));
  }

  // Find perms for the bot and the user
  const perms = channel.permissionsFor(client.user);
  const userPerms = channel.permissionsFor(message.author);

  // If the bot does not have the necessary perms to send the message, error on invalid permissions
  if (!perms.has('VIEW_CHANNEL', false) || !perms.has('SEND_MESSAGES', false)) {
    return message.error('Invalid Permissions!', "I don't seem to have permssions to read or send messages in that channel!");
  }
  // If the user does not have the necessary perms to send the message, error on invalid permissions
  if (!userPerms.has('VIEW_CHANNEL', false) || !userPerms.has('SEND_MESSAGES', false)) {
    return message.error('Invalid Permissions!', "You don't have permssions to read or send messages in that channel!");
  }

  // Send the provided message to the mentioned channel
  return channel.send(args.slice(1).join(' '), { split: true });
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'Mod',
  args: 1,
};

module.exports.help = {
  name: 'say',
  category: 'misc',
  description: 'Relays the given message into a channel',
  usage: 'say <channel> <message>',
  details: "<channel> => The channel you wish to send the message to. (Only needed if you're sending a message to a channel other than the current one)\n<message> => Any message you wish to be relayed",
};
