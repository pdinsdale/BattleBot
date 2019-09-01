module.exports.run = async (client, message, args, level, Discord, eco) => {
  let output = await eco.FetchBalance(message.author.id);
  const member = message.mentions.members.first() || message.member;

  if (!args[0]) {
    return message.channel.send(`**${member.displayName}**, You have ${client.emoji.money} \`${output.balance.toLocaleString()} coins\`!`);
  }

  output = await eco.FetchBalance(member.id);
  return message.channel.send(`**${member.displayName}'s** balance is ${client.emoji.money} \`${output.balance.toLocaleString()} coins\`!`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['bal', 'money', 'coins'],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'balance',
  category: 'economy',
  description: 'Shows your current balance or the balance of a mentioned user',
  usage: 'balance <@user>',
  details: '<@user> => (Optional) Any valid member of the server',
};
