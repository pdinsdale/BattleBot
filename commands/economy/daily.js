module.exports.run = async (client, message, args, level, Discord, eco) => {
  const output = await eco.Daily(message.author.id);

  if (output.updated) {
    const profile = await eco.AddToBalance(message.author.id, 5000);
    message.success('Successfully Claimed Daily Coins!', `**${message.member.displayName}**, You claimed your daily ${client.emoji.money} \`5000 coins\`! \nYou now have ${client.emoji.money} \`${profile.newbalance} coins\`!`);
  } else {
    message.error('Daily Coins Are Not Yet Reset!', `**${message.member.displayName}**, You can collect your daily ${client.emoji.money} coins again in \`${output.timetowait}\`!`);
  }
};

module.exports.conf = {
  enabled: true,
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
