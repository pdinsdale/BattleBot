module.exports.run = async (client, message, args, level, Discord, eco) => {
  const amount = parseInt(args[0], 10);
  let flip = Math.floor(Math.random() * 2);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(amount) || amount <= 0) {
    return message.reply('Please specify a proper amount of coins you wish to gamble!');
  }

  flip = flip === 0 ? 'heads' : 'tails';

  const output = await eco.FetchBalance(message.author.id);
  if (output.balance < amount) {
    return message.reply('You have less coins than the amount you want to gamble!');
  }

  const gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error);

  const ops = gamble.output === 'lost' ? '-' : '+';

  return message.channel.send(`**${message.member.displayName}**, You gambled \`${amount} coins\` and **${gamble.output}**! Balance: \`${output.balance} ${ops} ${amount} = ${gamble.newbalance} coins\``);
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['g'],
  permLevel: 'Verified',
  args: 1,
  cooldown: 60,
};

module.exports.help = {
  name: 'gamble',
  category: 'economy',
  description: 'Gambles the specified amount of coins',
  usage: 'gamble <amount>',
  details: '<amount> => The amount you wish to gamble. Must be equal to or less than what you own',
};
