const result = require('./results.json');

module.exports.run = (client, message, [month, year], level, Discord) => {
  const resultYear = result[year];

  if (!resultYear || !resultYear[month.toLowercase()]) {
    return message.error('Invalid Date!', 'Please specify a date between September, 2017 and now!');
  }

  const resultMonth = resultYear[month.toLowercase()];

  // Setting the embed
  const resultsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setColor('#02f044')
    .setFooter(`Created and Maintained by ${client.fetchOwner().tag} | ${client.version}`, client.user.displayAvatarURL)
    .setTimestamp()
    .setTitle(`${resultMonth.month} ${resultMonth.year} Faction Battle Results`)
    .setThumbnail(resultMonth.image)
    .addField(`${resultMonth.matchup}`, `Winner: ${resultMonth.winner}`)
    .addField('Points Distribution:', resultMonth.points);

  return message.channel.send(resultsEmbed);
};

module.exports.conf = {
  guildOnly: false,
  aliases: ['r', 'result'],
  permLevel: 'User',
  args: 2,
};

module.exports.help = {
  name: 'results',
  category: 'factions',
  description: 'Displays the results of the specified Faction Battle',
  usage: 'results <month> <year>',
  details: '<month> => between January and December\n<year> => between 2017 and the current year\nNOTE: The server was not around before September, 2017!',
};
