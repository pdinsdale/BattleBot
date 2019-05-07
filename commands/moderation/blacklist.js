module.exports = {
  name: 'blacklist',
  category: 'moderation',
  description: 'Blacklists the given word/phrase/link. Any member who uses a blacklisted item will be automatically kicked',
  aliases: ['bl'],
  usage: '[Word/Phrase/Link]',
  args: '[Word/Phrase/Link] => Can literally be anything but most useful when used with links as spam bots tend to use them',
  modonly: true,
  async run(client, message, args) {
    client.blacklisted.ensure(message.guild.id, []);

    const [value] = args;

    value.toString();

    if (!value) {
      return message.reply('Please provide a word/phrase/link!');
    }

    // Pushes args[0] to the blacklist enmap, logs it, and sends this messsage
    client.blacklisted.push(message.guild.id, value);
    console.log(`${message.author.tag} added ${value} to ${message.guild.name}'s blacklist!\nBlacklist: ${client.blacklisted.get(message.guild.id)}`);
    return message.channel.send('Successfully added to the blacklist! Any member who uses this word/phrase/link will be automatically kicked!');
  },
};
