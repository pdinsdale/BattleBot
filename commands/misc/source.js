// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  const channel = message.mentions.channels.first() || message.channel;
  let messageID = args[1];

  if (!messageID) {
    [messageID] = args;
  }

  return channel.fetchMessage(messageID)
    .then((msg) => message.channel.send(`Content for Message ID: \`${messageID}\`\nIn Channel: ${channel}\n\`\`\`${msg.content}\`\`\``))
    .catch(() => {
      message.error('Invalid Message ID for Provided Channel!', 'You must mention a **valid message id**! If the message you want is **not from this channel**, you must **mention a channel as well**! You must also make sure I can **view the channel**!');
    });
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sc'],
  permLevel: 'User',
  args: 1,
};

module.exports.help = {
  name: 'source',
  category: 'misc',
  description: "Gets the specified message and displays it's raw code blocks form",
  usage: 'source <channel> <messageID>',
  details: "<channel> The channel the message is from. (Only necessary if the message is not from the current channel.)\n<messageID> => The ID of the message. Can be found by right clicking a message and clicking 'Copy ID' with Developer Mode enabled.",
};
