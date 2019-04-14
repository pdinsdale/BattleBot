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
    let image = message.attachments.first();

    if (!image) {
      if (args[0]) {
        image = args[0].toString();
        client.user.setAvatar(image).catch((error) => {
          message.channel.send('Hmm... it appears something went wrong!');
          console.log(`Failed with ${error} in setavatar cmd`);
        });
        return message.channel.send('Successfully altered my avatar!');
      }
      return message.reply('Please attach an image or give a link to change my avater to!');
    }

    // Sets client's pfp
    client.user.setAvatar(image.url);

    // Sends success message
    return message.channel.send('Successfully altered my avatar!');
  },
};
