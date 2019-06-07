module.exports = {
  name: 'give',
  category: 'economy',
  description: 'Gives the mentioned user the specified amount of coins. (You must have equal to or more than the amount of coins you wish to transfer)',
  usage: '[@User] [amount]',
  args: '[@User] => Any valid member of the server \n[amount] => The amount of coins given to the mentioned user',
  cooldown: 10,
  async run(client, message, args, Discord, eco) {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let amount;
    let member;

    if (!args[0] || !args[1]) {
      return message.reply('Please @ a user and provide an amount to give!');
    }

    for (let a = 0; a < args.length; a++) {
      for (let i = 0; i < digits.length; i++) {
        if (args[a].includes(digits[i])) {
          amount = args[a];
        } else {
          const regex = args.match(/[^\s"]+|"([^"]*)"/g).join('').split('"');
          const newArgs = [];

          for (let n = 0; n < regex.length; n++) {
            if (regex[n] !== '') {
              newArgs.push(regex[i]);
            }
          }
          member = message.mentions.users.first() || message.guild.members.get(newArgs[a]);
        }
      }
    }

    if (!member || !amount) {
      return message.reply('Please mention a valid user and an amount to give!');
    }

    const output = await eco.FetchBalance(message.author.id);
    const outputM = await eco.FetchBalance(member.id);

    if (amount.includes('-')) {
      await eco.AddToBalance(message.author.id, amount);
      return message.channel.send(`Excuse me? You're trying to give *${member.tag}* a negative number! This would result in them losing coins! Stop trying to cheat my system! I've added \`${amount} coins\` to your account resulting in a coin decrease for this disgraceful act!`);
    }

    if (output.balance < amount) {
      return message.reply('You have less coins than the amount you want to transfer!');
    }

    const transfer = await eco.Transfer(message.author.id, member.id, amount);
    return message.reply(`Transfer of coins successful!\nTransfer from **${message.author.tag}**: \`${output.balance} - ${amount} = ${transfer.FromUser}\`\nTransfer to **${member.tag}**: \`${outputM.balance} + ${amount} = ${transfer.ToUser}\``);
  },
};
