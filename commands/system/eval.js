function clean(text) {
  if (typeof (text) === 'string') {
    // eslint-disable-next-line prefer-template
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  }
  return text;
}

module.exports = {
  name: 'eval',
  category: 'system',
  description: 'Converts the given string into JS code and executes it',
  usage: '[code]',
  args: '[code] => Any valid, executable JS code',
  owneronly: true,
  async run(client, message, args, Discord) {
    const code = args.join(' ');

    const codeEmbed = new Discord.RichEmbed()
      .setAuthor('Eval', message.author.avatarURL)
      .addField('Input', `\`\`\`${code}\`\`\``);

    try {
      // eslint-disable-next-line no-eval
      let evaled = eval(code);

      if (typeof evaled !== 'string') {
        // eslint-disable-next-line global-require
        evaled = require('util').inspect(evaled);
      }

      codeEmbed.setColor('#37ec4b')
        .addField('Output', `\`\`\`${clean(evaled)}\`\`\``);

      message.channel.send(codeEmbed);
    } catch (err) {
      codeEmbed.setColor('#eb2219')
        .addField('ERROR', `\`\`\`${clean(err)}\`\`\``);

      message.channel.send(codeEmbed);
    }
  },
};
