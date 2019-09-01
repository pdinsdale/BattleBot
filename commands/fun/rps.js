// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, [userThrow], level) => {
  const choices = [
    {
      choice: 'rock',
      beats: 'scissors',
    },
    {
      choice: 'scissors',
      beats: 'paper',
    },
    {
      choice: 'paper',
      beats: 'rock',
    },
  ];

  const random = Math.floor(Math.random() * choices.length);
  const final = choices[random];
  const resultStr = `You threw \`${userThrow}\` while your opponent threw \`${final.choice}\`!`;

  if (userThrow.toLowerCase() === final.choice) {
    message.channel.send(`${client.emoji.minusSign} **Tie!**\nYou both threw \`${final.choice}\` and tied!`);
  } else if (userThrow.toLowerCase() !== final.beats) {
    message.success('You Won!', resultStr);
  } else {
    message.error('You Lost!', resultStr);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  args: 1,
};

module.exports.help = {
  name: 'rps',
  category: 'fun',
  description: 'Plays rock paper scissors',
  usage: 'rps <rock|paper|scissors>',
  details: 'Rock beats scissors, scissors beats paper, paper beats rock. Pretty simple.',
};
