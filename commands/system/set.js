module.exports = {
  name: 'set',
  category: 'system',
  description: 'Sets the specified item',
  usage: '[item] [new value]',
  args: '[item] => avatar, nickname, servericon \n[new value] => (avatar) => Link or image attachment for new bot image\n(nickname) => New nickname for bot\n(servericon) => Link or image attachment for new server icon',
  modonly: true,
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line consistent-return
  run(client, message, args) {
    // Sets image to the attachment
    let image = message.attachments.first();

    const [item, value] = args;

    switch (item.toLowerCase()) {
      default:
        // eslint-disable-next-line no-useless-escape
        message.reply('Please specifiy an item! Items available and descriptions can be found by using \`.help set\`!');
        break;
      case 'avatar': case 'icon': case 'pfp':
        if (!image) {
          if (value) {
            image = value.toString();
            client.user.setAvatar(image).catch((error) => {
              message.channel.send('Hmm... it appears something went wrong!');
              console.log(`Failed with ${error} in set cmd`);
            });
            return message.channel.send('Successfully altered my avatar!');
          }
          return message.reply('Please attach an image or give a link to change my avater to!');
        }

        // Sets client's pfp
        client.user.setAvatar(image.url);

        // Sends success message
        message.channel.send('Successfully altered my avatar!');
        break;
      case 'nickname': case 'nick': case 'name':
        // Gets client's user and sets nickname to args[1] and displays the message
        if (!value) {
          return message.reply('You need to provide something to change my nickname to!');
        }
        message.guild.members.get(client.user.id).setNickname(`${args.slice(1).join(' ')}`);
        message.channel.send(`Successfully changed my nickname to **${args.slice(1).join(' ')}**!`);
        break;
      case 'servericon': case 'serverpfp':
        if (!image) {
          if (value) {
            image = value.toString();
            message.guild.setIcon(image).catch((error) => {
              message.channel.send('Hmm... it appears something went wrong! Maybe check my permissions...');
              console.log(`Failed with ${error} in set cmd`);
            });
            return message.channel.send(`Successfully altered **${message.guild.name}**'s icon!`);
          }
          return message.reply("Please attach an image or give a link to change the server's icon to!");
        }

        // Sets guild's icon
        message.guild.setIcon(image.url);

        // Sends success message
        message.channel.send(`Successfully altered **${message.guild.name}**'s icon!`);
    }
  },
};
