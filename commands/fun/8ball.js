const emoji = require('../../src/emoji');

module.exports = {
  name: '8ball',
  category: 'fun',
  description: 'Provides randomly generated responses to an asked Yes-or-No question',
  aliases: ['8', 'predict'],
  usage: '[Question]',
  args: '[Question] => Any Yes-or-No question will suffice',
  async run(client, message, args) {
    // If args[0] doesn't exist, display this
    if (!args[0]) {
      return message.reply(`Proper Usage: \`${client.guildConfig.prefix}8ball [Question]\``);
    }

    const resp = ['It is certain', 'It is decidedly so', 'Replay hazy... Try again', 'Cannot predict now', "Don't count on it", 'Outlook not so good', 'My sources say no', 'Signs point to yes'];

    // Sets the randomNumber variable up for 8 random messages
    const random = Math.floor(Math.random() * 7);

    return message.channel.send(`${emoji['8ball']} | ${resp[random]}, **${message.member.displayName}**`);
  },
};
