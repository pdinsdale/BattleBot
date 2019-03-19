module.exports = {
  name: 'give',
  description: 'Gives the mentioned user the specified amount of coins. (You must have equal to or more than the amount of coins you wish to transfer)',
  usage: '[@User] [amount]',
  args: '[@User] => Any valid member of the server \n[amount] => The amount of coins given to the mentioned user',
  cooldown: 10,
  async run(client, message, args, Discord, eco) {
    const user = message.mentions.users.first();
    const amount = args[1];

    if (!user || !amount) {
      return message.reply('Please mention a valid user and an amount to give!');
    }

    const output = await eco.FetchBalance(message.author.id);
    const outputM = await eco.FetchBalance(user.id);
    if (output.balance < amount) {
      return message.reply('You have less coins than the amount you want to transfer!');
    }

    const transfer = await eco.Transfer(message.author.id, user.id, amount);
    return message.reply(`Transfer of coins successful!\nTransfer from **${message.author.tag}**: \`${output.balance} - ${amount} = ${transfer.FromUser}\`\nTransfer to **${user.tag}**: \`${outputM.balance} + ${amount} = ${transfer.ToUser}\``);
  },
};
