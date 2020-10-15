module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  // Pasre the amount from args
  const amount = parseInt(args[0], 10);
  // Determine a random flip: 0 or 1
  let flip = Math.floor(Math.random() * 2);

  // If amount is NaN (Not a Number) or less than 0, error on insufficient amount
  if (isNaN(amount) || amount <= 0) { // eslint-disable-line no-restricted-globals
    return message.error('Insufficient Amount!', 'Please specify a proper amount of starbits you wish to gamble!');
  }

  // Set flip equal to heads if it was 0, or tails if it was 1
  flip = flip === 0 ? 'heads' : 'tails';

  // Fetch user balance and check if it's less than the amount provided. If it is, error on insufficient funds
  const output = await eco.FetchBalance(message.author.id);
  if (output.balance < amount) {
    return message.error('Insufficient Funds!', 'You have less starbits than the amount you want to gamble!');
  }

  // Use pre-built coinflip function to calculate outcome and add/subtract from user's balance
  const gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error);

  // If output = lost, display a lost message, else, display a win message
  const gambleMsg = gamble.output === 'lost' ? message.error('You Lost!', `**${message.member.displayName}**, You gambled ${starbits} \`${amount.toLocaleString()} starbits\` and **${gamble.output}**! Balance: \`${output.balance.toLocaleString()} - ${amount.toLocaleString()} = ${gamble.newbalance.toLocaleString()} starbits\``) : message.success('You Won!', `**${message.member.displayName}**, You gambled ${starbits} \`${amount.toLocaleString()} starbits\` and **${gamble.output}**! Balance: \`${output.balance.toLocaleString()} + ${amount.toLocaleString()} = ${gamble.newbalance.toLocaleString()} starbits\``);
  return gambleMsg;
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['g'],
  permLevel: 'Verified',
  args: 1,
  cooldown: 60,
};

module.exports.help = {
  name: 'gamble',
  category: 'economy',
  description: 'Gambles the specified amount of starbits',
  usage: 'gamble <amount>',
  details: '<amount> => The amount you wish to gamble. Must be equal to or less than what you own',
};
