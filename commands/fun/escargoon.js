module.exports = {
  name: 'escargoon',
  category: 'fun',
  description: 'Sends a random escargoon image',
  aliases: ['es', 'eg'],
  usage: ' ',
  no1uw: true,
  async run(client, message, args, Discord) {
    const random = Math.ceil(Math.random() * 5);

    const embed = new Discord.RichEmbed()
      .setAuthor('Escargoon')
      .setTimestamp()
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setColor('#4199c2');

    function escargoon(image) {
      embed.setImage(image);
      message.channel.send(embed);
    }

    switch (random) {
      default:
        message.channel.send('Something weird happened...');
        break;
      case 1:
        escargoon('https://i.imgur.com/bxRdbeW.png');
        break;
      case 2:
        escargoon('https://i.imgur.com/qNQyhEp.png');
        break;
      case 3:
        escargoon('https://i.imgur.com/eyY9MKY.png');
        break;
      case 4:
        escargoon('https://i.imgur.com/wxPZW93.jpg');
        break;
      case 5:
        escargoon('https://i.imgur.com/O4uVBl8.jpg');
        break;
    }
  },
};
