module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  // Fetch the daily output and the user's balance
  const output = await eco.Daily(message.author.id, 5000);
  const profile = await eco.FetchBalance(message.author.id);

  // If daily has reset, display the user has claimed it. If not, display otherwise
  if (output.updated) {
    message.success('Successfully Claimed Daily starbits!', `**${message.member.displayName}**, You claimed your daily ${starbits} \`${output.earned ? output.earned.toLocaleString() : '5000'}\` starbits! \nYou now have ${starbits} \`${profile.balance ? profile.balance.toLocaleString() : '5000'} starbits\`!`);
  } else {
    message.error('Daily starbits Are Not Yet Reset!', `**${message.member.displayName}**, You can collect your daily ${starbits} starbits again in \`${output.timetowait}\`!`);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['d', 'day'],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'daily',
  category: 'economy',
  description: 'Gives you your daily starbits which reset every 12 hours',
  usage: 'daily',
};
