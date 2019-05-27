const result = require('./results.json');

module.exports = {
  name: 'results',
  category: 'factions',
  description: 'Displays the results of the specified Faction Battle',
  aliases: ['r', 'result'],
  usage: '[month] [year]',
  args: '[month] => between January and December \n[year] => between 2017 and the current year \nNOTE: The server was not around before September, 2017!',
  async run(client, message, args, Discord) {
    let month = args[0];
    const year = args[1];

    const resultYear = result[year];

    // If no args[0] or args[1], display this
    if (!year || !month || !resultYear) {
      return message.reply(`Proper Usage: \`${client.guildConfig.prefix}results [month] [year]\``);
    }

    month = month.toLowerCase();

    if (!resultYear[month]) {
      return message.reply('Please specify a date between September, 2017 and now!');
    }

    const resultMonth = resultYear[month];

    // Setting the embed
    const resultsEmbed = new Discord.RichEmbed()
      .setAuthor(message.member.user.tag, message.author.avatarURL)
      .setColor('#02f044')
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setTimestamp()
      .setTitle(`${resultMonth.month} ${resultMonth.year} Faction Battle Results`)
      .setThumbnail(resultMonth.image)
      .addField(`${resultMonth.matchup}`, `Winner: ${resultMonth.winner}`)
      .addField('Points Distribution:', resultMonth.points);

    return message.channel.send(resultsEmbed);
  },
};
