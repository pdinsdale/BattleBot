module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get either a mentioned member or the member oject of the author
  const member = message.mentions.members.first() || message.member;
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);

  // Fetch user balance from economy database
  const output = await eco.FetchBalance(member.id);
  // Send balance to channel
  return message.channel.send(`**${member.displayName}'s** balance is ${starbits} \`${output.balance.toLocaleString()} starbits\`!`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['bal', 'money', 'starbits'],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'balance',
  category: 'economy',
  description: 'Shows your current balance or the balance of a mentioned user',
  usage: 'balance <@user>',
  details: '<@user> => (Optional) Any valid member of the server',
};
