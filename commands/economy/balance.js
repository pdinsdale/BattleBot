module.exports = {
  name: 'balance',
  category: 'economy',
  description: 'Shows your current balance',
  aliases: ['coins', 'money', 'bal'],
  usage: '[@User]',
  args: '[@User] => (Optional) Any valid member of the server',
  async run(client, message, args, Discord, eco) {
    let output = await eco.FetchBalance(message.author.id);
    const member = message.mentions.members.first() || message.member;

    if (!args[0]) {
      return message.channel.send(`**${member.displayName}**, You have :money_with_wings: \`${output.balance} coins\`!`);
    }

    output = await eco.FetchBalance(member.id);
    return message.channel.send(`**${member.displayName}'s** balance is :money_with_wings: \`${output.balance} coins\`!`);
  },
};
