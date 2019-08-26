// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  const resp = ['It is certain', 'It is decidedly so', 'Replay hazy... Try again', 'Cannot predict now', "Don't count on it", 'Outlook not so good', 'My sources say no', 'Signs point to yes'];

  // Sets the random variable up for 8 random messages
  const random = Math.floor(Math.random() * resp.length);

  return message.channel.send(`${client.emoji['8ball']} | ${resp[random]}, **${message.member.displayName}**`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['8', 'predict'],
  permLevel: 'User',
  args: 1,
};

module.exports.help = {
  name: '8ball',
  category: 'fun',
  description: 'Provides random responses to an asked Yes-or-No question',
  usage: '<question>',
  details: '<question> => Any Yes-or-No question will suffice',
};
