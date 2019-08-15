const result = require('./results.json');

module.exports.run = (client, message, args, level, Discord) => {
  const month = args[0].toLowerCase();
  const year = args[1];

  const resultYear = result[year];

  if (!resultYear || !resultYear[month]) {
    return message.error('Invalid Date!', 'Please specify a date between September, 2017 and now!');
  }

  const resultMonth = resultYear[month];

  // Setting the embed
  const resultsEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor('#02f044')
    .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
    .setTimestamp()
    .setTitle(`${resultMonth.month} ${resultMonth.year} Faction Battle Results`)
    .setThumbnail(resultMonth.image)
    .addField(`${resultMonth.matchup}`, `Winner: ${resultMonth.winner}`)
    .addField('Points Distribution:', resultMonth.points);

  return message.channel.send(resultsEmbed);
};

module.exports.conf = {
  enabled: true,
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
