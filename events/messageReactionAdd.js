const emoji = require('../src/emoji');

// eslint-disable-next-line no-unused-vars
module.exports = (reaction, user) => {
  const { message } = reaction;

  const pollResults = message.client.pollResults.ensure(message.guild.id, {
    question: 'question',
    messageID: 'ID',
    options: {
      option0: 0,
      option1: 0,
    },
  });

  if (message.id !== pollResults.messageID) {
    return;
  }

  function pollMath(optN) {
    return pollResults.inc(message.guild.id, `options.option${optN}`);
  }

  if (reaction.name === emoji[0]) {
    pollMath('0');
  } else if (reaction.name === emoji[1]) {
    pollMath('1');
  } else if (reaction.name === emoji[2]) {
    pollMath('2');
  } else if (reaction.name === emoji[3]) {
    pollMath('3');
  } else if (reaction.name === emoji[4]) {
    pollMath('4');
  } else if (reaction.name === emoji[5]) {
    pollMath('5');
  }

  reaction.remove();
};
