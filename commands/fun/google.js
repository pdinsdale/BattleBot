const google = require('google');

module.exports = {
  name: 'google',
  category: 'fun',
  description: 'Googles the given query',
  aliases: ['gogle'],
  usage: '[Search Query]',
  args: '[Search Query] => Any text to search Google for. Literally the same text you would put in a search bar',
  async run(client, message, args, Discord) {
    const query = args.join(' ');

    if (!query) {
      return message.reply('Please provide a search query!');
    }

    const searchMsg = await message.channel.send(`Searching Google for \`${query}\`...`);

    google.resultsPerPage = 25;

    // eslint-disable-next-line consistent-return
    return google(query, (err, res) => {
      if (err) {
        return message.reply('Something went wrong...');
      }

      for (let i = 0; i < res.links.length; i++) {
        const link = res.links[i];
        if (!link.href) {
          res.next();
        } else {
          if (!link.description) link.description = 'No description';
          const embed = new Discord.RichEmbed()
            .setTitle(`Google Search For \`${query}\``)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`**Link**: [${link.title}](${link.href})\n\n**Description**:\n${link.description}`)
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL);

          return searchMsg.edit(embed).catch(() => message.channel.send('Something went wrong...'));
        }
      }
    });
  },
};
