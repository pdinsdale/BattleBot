/* eslint-disable no-useless-escape */
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
    const newArgs = [];
    const regex = pollArgs.match(/[^\s"]+|"([^"]*)"/g);

    if (!pollArgs.includes('"')) {
      return message.reply('Please use \`"\`!');
    }

    for (let i = 0; i < regex.length; i++) {
      newArgs.push(regex[i]);
    }

    const embed = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(newArgs[0]);

    for (let i = 1; i < newArgs.length; i++) {
      embed.addField(newArgs[i]);
    }

    return channel.send(embed);
  },
};
