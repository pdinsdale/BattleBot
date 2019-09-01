// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  const channel = message.mentions.channels.first();

  if (!channel) {
    return message.channel.send(args.join(' '));
  }

  const perms = channel.permissionsFor(client.user);
  const userPerms = channel.permissionsFor(message.author);

  if (!perms.has('VIEW_CHANNEL', false) || !perms.has('SEND_MESSAGES', false)) {
    return message.error('Invalid Permissions!', "I don't seem to have permssions to read or send messages in that channel!");
  }
  if (!userPerms.has('VIEW_CHANNEL', false) || !userPerms.has('SEND_MESSAGES', false)) {
    return message.error('Invalid Permissions!', "You don't have permssions to read or send messages in that channel!");
  }

  return channel.send(args.slice(1).join(' '), { split: true });
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'Verified',
  args: 1,
};

module.exports.help = {
  name: 'say',
  category: 'misc',
  description: 'Relays the given message into a channel',
  usage: 'say <channel> <message>',
  details: "<channel> => The channel you wish to send the message to. (Only needed if you're sending a message to a channel other than the current one)\n<message> => Any message you wish to be relayed",
};
