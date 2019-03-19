module.exports = {
  name: 'gamble',
  description: 'Gambles the specified amount of coins',
  aliases: ['g'],
  usage: '[amount]',
  args: '[amount] => The amount you wish to gamble. Must be equal to or less than what you own',
  cooldown: 10,
  async run(client, message, args, Discord, eco) {
    const amount = args[0];
    let flip = Math.ceil(Math.random() * 2);
    let ops = '+';

    if (flip === 1) {
      flip = 'heads';
    } else if (flip === 2) {
      flip = 'tails';
    }

    if (!amount) {
      return message.reply('Please specify a proper amount of coins you wish to gamble!');
    }

    const output = await eco.FetchBalance(message.author.id);
    if (output.balance < amount) {
      return message.reply('You have less coins than the amount you want to gamble!');
    }

    const gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error);

    if (gamble.output === 'lost') {
      ops = '-';
    }

    return message.channel.send(`**${message.member.displayName}**, You gambled \`${amount} coins\` and **${gamble.output}**! Balance: \`${output.balance} ${ops} ${amount} = ${gamble.newbalance} coins\``);
  },
};
