module.exports = {
  name: 'setavatar',
  category: 'system',
  description: 'Sets the avatar for BattleBot',
  aliases: ['seticon', 'setpfp'],
  usage: '(Image attached)',
  modonly: true,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets image to the attachment
    const image = message.attachments.first().url;

    if (!image) {
      return message.reply('Please attach an image to change my avater to!');
    }

    // Sets client's pfp
    client.user.setAvatar(image);

    // Sends success message
    return message.channel.send('Successfully altered my avatar!');
  },
};
