module.exports = {
  name: 'say',
  category: 'misc',
  description: 'Relays the given message into a set channel',
  usage: '[Channel] [Message]',
  args: '[Channel] => The channel you wish to send the message\n[Message] => Any message you wish to be relayed',
  async run(client, message, args) {
    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.channel.send(args.join(' '));
    }

    const perms = channel.permissionsFor(client.user);
    const userPerms = channel.permissionsFor(message.author);

    if (!perms.has('READ_MESSAGES', false) || !perms.has('SEND_MESSAGES', false)) {
      return message.reply("I don't seem to have permssions to read or send messages in that channel!");
    }
    if (!userPerms.has('READ_MESSAGES', false) || !userPerms.has('SEND_MESSAGES', false)) {
      return message.reply("You don't have permssions to read or send messages in that channel!");
    }

    return channel.send(args.slice(1).join(' '), { split: true });
  },
};
