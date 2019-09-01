module.exports.run = async (client, message, args, level, Discord, eco) => {
  const output = await eco.Daily(message.author.id, 5000);
  const profile = await eco.FetchBalance(message.author.id);

  if (output.updated) {
    message.success('Successfully Claimed Daily Coins!', `**${message.member.displayName}**, You claimed your daily ${client.emoji.money} \`${output.earned.toLocaleString()}\` coins! \nYou now have ${client.emoji.money} \`${profile.balance.toLocaleString()} coins\`!`);
  } else {
    message.error('Daily Coins Are Not Yet Reset!', `**${message.member.displayName}**, You can collect your daily ${client.emoji.money} coins again in \`${output.timetowait}\`!`);
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
  description: 'Gives you your daily coins which reset every 12 hours',
  usage: 'daily',
};
