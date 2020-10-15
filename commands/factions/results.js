// Require results.json which contains results data
const result = require('./results.json');

module.exports.run = async (client, message, [month, year], level, Discord) => {
  // Find the year of the result
  const resultYear = result[year];

  // If the year or month provided is not found, error on invalid date
  if (!resultYear || !resultYear[month.toLowerCase()]) {
    return message.error('Invalid Date!', "Please specify a date between September, 2017 and now! And check your spelling! (It' s not case-sensitive!)");
  }

  // Find the month of the result
  const resultMonth = resultYear[month.toLowerCase()];

  // Build the results embed
  const owner = await client.fetchOwner();
  const resultsEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'gif' }))
    .setColor('#02f044')
    .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
    .setTimestamp()
    .setTitle(`${resultMonth.month} ${resultMonth.year} Faction Battle Results`)
    .setThumbnail(resultMonth.image)
    .addField(`${resultMonth.matchup}`, `Winner: ${resultMonth.winner}`)
    .addField('Points Distribution:', resultMonth.points);

  // Send the results embed
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
