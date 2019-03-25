module.exports = {
  name: 'say',
  description: 'Relays the given message into a set channel',
  usage: '[Channel] [Message]',
  args: '[Channel] => The channel you wish to send the message\n[Message] => Any message you wish to be relayed',
  modonly: true,
  async run(client, message, args) {
    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.channel.send(args.join(' '));
    }

    const perms = channel.permissionsFor(client.user);

    if (!perms.has('READ_MESSAGES', false) || !perms.has('SEND_MESSAGES', false)) {
      return message.reply("I don't seem to have permssions to read or send messages in that channel!");
    }

    return channel.send(args.slice(1).join(' '), { split: true });
  },
};
