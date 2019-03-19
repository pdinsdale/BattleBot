module.exports = {
  name: 'ecoset',
  description: 'Sets the specified amount of coins to the specified user in the economy database',
  aliases: ['ecos', 'es'],
  usage: '[@User] [amount]',
  args: '[@User] => Any valid member of the server \n[amount] => The amount of coins you want set to the specified user',
  owneronly: true,
  async run(client, message, args, Discord, eco) {
    const user = message.mentions.users.first();
    const amount = args[1];

    if (!amount) {
      return message.reply('Please specify an amount to set to the user!');
    }

    const output = await eco.SetBalance(user.id, amount);

    return message.channel.send(`**${message.member.displayName}**, \`${output.balance} coins\` was successfully set to **${user.tag}**`);
  },
};
