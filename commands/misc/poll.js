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
    const results = client.pollResults.ensure(message.guild.id, {
      question: 'question',
      messageID: 'ID',
      options: {
        option0: 0,
        option1: 0,
      },
    });

    const mappedRes = Object.keys(client.pollResults).map(props => `${props.options}  :  ${client.pollResults.options[props]}`).join('\n');

    if (args[0] === 'results' || args[0] === 'result') {
      message.channel.send(`Here are the results for the **current** poll!\n\n${mappedRes}`);
    }

    let ch = message.mentions.channels.first();
    const pollArgs = args.slice(1).join(' ');
    const regex = pollArgs.match(/[^\s"]+|"([^"]*)"/g).join('').split('"');
    const newArgs = [];

    for (let i = 0; i < regex.length; i++) {
      if (regex[i] !== '') {
        newArgs.push(regex[i]);
      }
    }

    if (!ch) {
      ch = message.channel;
    }

    const embed = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(newArgs[0])
      .setColor('RANDOM')
      .setFooter('React to vote!')
      .setDescription('Your vote is completely anonymous and your reaction will be automatically deleted to keep this anonymity. Your vote will be internally counted.');

    const regexNQ = newArgs.slice(1);

    for (let i = 0; i < regexNQ.length; i++) {
      embed.addField(`${emoji[i]} ${regexNQ[i]}`, '\u200b');
    }

    results.set(message.guild.id, newArgs[0], 'question');

    if (regexNQ.length > 2) {
      for (let i = 0; i < regexNQ.length; i++) {
        const n = 3 + i;
        results.setProp(message.guild.id, `options.option${n}`, 0);
      }
    }

    return ch.send(embed).then((msg) => {
      results.set(message.guild.id, msg.id, 'messageID');

      for (let i = 0; i < regexNQ.length; i++) {
        msg.react(emoji[i]);
      }
    });
  },
};
