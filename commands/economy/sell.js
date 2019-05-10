const items = require('./items.json');

module.exports = {
  name: 'sell',
  category: 'economy',
  description: 'Sells the specified item and adds the item amount to your coin count',
  aliases: ['sel'],
  usage: '[Item ID #]',
  args: '[Item ID #] => The ID of the item you wish to buy',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args, Discord, eco) {
    if (!args[0]) {
      return message.reply('Please specifiy the ID # of the item you wish to sell!');
    }

    const id = parseInt(args[0], 10);
    const item = items[id];

    const userCollection = client.userItems.ensure(message.author.id, []);

    if (!item) {
      return message.reply('Please provide a valid item ID!');
    }

    if (!userCollection.includes(`${item.name} - ID: ${item.id}`)) {
      return message.reply('That item is not currently in your collection!');
    }

    client.userItems.remove(message.author.id, `${item.name} - ID: ${item.id}`);
    const add = await eco.AddToBalance(message.author.id, item.price);
    return message.channel.send(`**${message.member.displayName}**, You successfully sold **${item.name}** and got your money back!\nYour new balance is :money_with_wings: \`${add.newbalance}\` coins!`);
  },
};
