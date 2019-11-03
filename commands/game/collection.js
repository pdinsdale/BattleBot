module.exports.run = (client, message, args, level) => {
  const userProfile = client.gacha.ensure(message.author.id, {
    blueCoins: 0,
    fiveStarA: [],
    fiveStar: [],
    fourStarA: [],
    fourStar: [],
    threeStar: [],
  });

  const ref = client.gacha.get('emoji');

  const displayEmoji = (arr) => arr.map((e) => `:${e}:`);

  const fiveStarA = displayEmoji(userProfile.fiveStarA);
  const fiveStar = displayEmoji(userProfile.fiveStar);
  const fourStarA = displayEmoji(userProfile.fourStarA);
  const fourStar = displayEmoji(userProfile.fourStar);
  const threeStar = displayEmoji(userProfile.threeStar);

  return message.channel.send(`**Here is your collection of emojis!**\n\n${ref.fiveStarA.star.repeat(ref.fiveStarA.count)}\n\`${fiveStarA.join('\`, \`')}\``);
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'collection',
  category: 'game',
  description: 'Shows your collection',
  usage: 'collection',
};
