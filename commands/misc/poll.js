/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
module.exports = {
  name: 'poll',
  category: 'misc',
  description: 'Creates a 2-reaction poll for the provided Yes-or-No question',
  usage: '[Question]',
  args: '[Question] => Any Yes-or-No question',
  modonly: true,
  enabled: false,
  async run(client, message, args, Discord) {
    const recompose = args.join(' ');

    const indices = [];

    for (const i in recompose) {
      const char = recompose[i];
      if (char === '"') {
        indices.push(i);
      }
    }

    if (!args[0]) return message.reply('Well what am I suppose to do?');

    const channel = message.mentions.channels.first();

    if (!channel) return message.reply('You did not specify a proper channel to send the poll to!');

    const question = recompose.substring(indices[0] + 1, indices[1]);

    const pollEmbed = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(question);

    if (indices.length === 2) {
      const YesNo = await client.channels.get(channel.id).send(pollEmbed);

      await YesNo.react('✅');
      await YesNo.react('❌');
    } else if (indices.length === 6) {
      const answerOne = recompose.substring(indices[2], indices[3]).replace('"', ' ');
      const answerTwo = recompose.substring(indices[4], indices[5]).replace('"', ' ');

      pollEmbed.setDescription(`${answerOne}\n${answerTwo}`);

      const twoAnswer = await client.channels.get(channel.id).send(pollEmbed);

      await twoAnswer.react('🇦');
      await twoAnswer.react('🇧');
    }
  },
};
