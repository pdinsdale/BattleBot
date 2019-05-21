/* eslint-disable no-await-in-loop */
/* eslint-disable no-useless-escape */
const emoji = require('../../src/emoji');

module.exports = {
  name: 'poll',
  category: 'misc',
  description: 'Creates a 2-reaction poll for the provided Yes-or-No question',
  usage: '[Question]',
  args: '[Question] => Any Yes-or-No question',
  modonly: true,
  enabled: false,
  async run(client, message, args, Discord) {
    const channel = message.mentions.channels.first();
    const pollArgs = args.slice(1).join(' ');
    const regex = pollArgs.match(/[^\s"]+|"([^"]*)"/g).join('').split('"');
    const newArgs = [];

    for (let i = 0; i < regex.length; i++) {
      if (regex[i] !== '') {
        newArgs.push(regex[i]);
      }
    }

    if (!channel) {
      return message.reply('Please mention a channel to send the poll to!');
    }

    const embed = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(newArgs[0])
      .setColor('RANDOM')
      .setFooter('React to vote!')
      .setDescription('\u200b');

    const regexNQ = newArgs.slice(1);

    for (let i = 0; i < regexNQ.length; i++) {
      embed.addField(`${emoji[i]} ${regexNQ[i]}`, '\u200b');
    }

    await channel.send(embed).then((msg) => {
      console.log(msg.id);
      for (let i = 0; i < regexNQ.length; i++) {
        msg.react(emoji[i]);
      }
    });
  },
};
