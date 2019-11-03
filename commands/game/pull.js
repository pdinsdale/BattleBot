/* eslint-disable no-nested-ternary */
// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  const userProfile = client.gacha.ensure(message.author.id, {
    blueCoins: 0,
    fiveStarA: [],
    fiveStar: [],
    fourStarA: [],
    fourStar: [],
    threeStar: [],
  });

  if (userProfile.blueCoins < 10) {
    return message.error('Insufficent Funds!', `You only have \`${userProfile.blueCoins} blue coins\`! \`10 blue coins\` are required for one pull!`);
  }

  const ref = client.gacha.get('emoji');
  const numRare = Math.floor(Math.random() * 101);

  const rariety = numRare <= 60 ? 'threeStar'
    : numRare > 60 && numRare <= 78 ? 'fourStar'
      : numRare > 78 && numRare <= 90 ? 'fourStarA'
        : numRare > 90 && numRare <= 96 ? 'fiveStar'
          : numRare > 96 && numRare <= 100 ? 'fiveStarA'
            : null;

  const { star } = ref[rariety].star;
  const { count } = ref[rariety].star;
  const emojiRef = ref[rariety].emoji[Math.floor(Math.random() * ref[rariety].emoji.length)];
  const emoji = client.emojis.find((e) => e.name === emojiRef);

  client.gacha.push(message.author.id, emojiRef, rariety, true);
  client.gacha.math(message.author.id, '-', 10, 'blueCoins');

  return message.success('Pulled!', `You've successfully pulled ${star.repeat(count)} ${emoji} \`${emoji}\`! You have \`${client.gacha.get(message.author.id).blueCoins} blue coins\` left!`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'pull',
  category: 'game',
  description: 'Pulls an emoji',
  usage: 'pull',
};
