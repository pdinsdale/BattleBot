module.exports = {
  name: 'blacklist',
  category: 'moderation',
  description: 'Blacklists the given word/phrase/link. Any member who uses a blacklisted item will be automatically kicked',
  aliases: ['bl'],
  usage: '[Identifyer] [Word/Phrase/Link]',
  args: '[Identifyer] => A word that is used to identufy the item in the blacklist\n[Word/Phrase/Link] => Can literally be anything but most useful when used with links as spam bots tend to use them',
  modonly: true,
  async run(client, message, args) {
    client.blacklisted.ensure(message.guild.id, {});

    // Pushes args[0] to the blacklist enmap, logs it, and sends this messsage
    client.blacklisted.setProp(message.guild.id, `${args[0]}`, `${args[1]}`);
    console.log(`${message.member.user.tag} added ${args[0]} to the blacklist!\nBlacklist: ${client.blacklisted}`);
    message.channel.send('Successfully added to the blacklist! Any member who uses this word/phrase/link will be automatically kicked!');
  },
};
