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

    // Sets the randomNumber variable up for 8 random messages
    const randomNumber = Math.floor(Math.random() * 7);

    // If randomNumber = to <said number> say this; pretty staightforward
    switch (randomNumber) {
      default:
        message.channel.send('Something weird happened...');
        break;
      case 0:
        message.channel.send(`:8ball: | It is certain, **${message.member.displayName}**`);
        break;
      case 1:
        message.channel.send(`:8ball: | It is decidedly so, **${message.member.displayName}**`);
        break;
      case 2:
        message.channel.send(`:8ball: | Replay hazy... Try again, **${message.member.displayName}**`);
        break;
      case 3:
        message.channel.send(`:8ball: | Cannot predict now, **${message.member.displayName}**`);
        break;
      case 4:
        message.channel.send(`:8ball: | Don't count on it, **${message.member.displayName}**`);
        break;
      case 5:
        message.channel.send(`:8ball: | My sources say no, **${message.member.displayName}**`);
        break;
      case 6:
        message.channel.send(`:8ball: | Outlook not so good, **${message.member.displayName}**`);
        break;
      case 7:
        message.channel.send(`:8ball: | Signs point to yes, **${message.member.displayName}**`);
        break;
    }
    return console.log(`${message.author.displayName} used the 8ball cmd and returned a value of ${randomNumber}`);
  },
};
