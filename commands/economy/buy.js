const items = require('./items.json');

module.exports = {
  name: 'buy',
  category: 'economy',
  description: 'Adds the specified item to your collection and deducts the item amount from your coin count',
  aliases: ['b'],
  usage: '[Item ID #]',
  args: '[Item ID #] => The ID of the item you wish to buy',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args, Discord, eco) {
    if (!args[0]) {
      return message.reply('Please specifiy the ID # of the item you wish to buy!');
    }

    const id = parseInt(args[0], 10);
    const item = items[id];

    client.userItems.ensure(message.author.id, []);

    if (!item) {
      return message.reply('Please provide a valid item ID!');
    }

    const ecoB = await eco.FetchBalance(message.author.id);
    if (ecoB.balance < item.price) {
      return message.reply(`You do not have enough coins to purchase this item!\nCurrent balance: :money_with_wings:\`${ecoB.balance}\` coins`);
    }

    client.userItems.push(message.author.id, `${item.name} - ID: ${item.id}`, null, true);
    const sub = await eco.SubstractFromBalance(message.author.id, item.price);
    return message.channel.send(`**${message.member.displayName}**, You successfully bought **${item.name}** and added it to you collection!\nYour new balance is :money_with_wings: \`${sub.newbalance}\` coins!\nTo see your collection, use \`${client.guildConfig.prefix}items\`!`);
  },
};
