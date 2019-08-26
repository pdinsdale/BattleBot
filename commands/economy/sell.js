const items = require('./items.json');

module.exports.run = async (client, message, args, level, Discord, eco) => {
  const id = parseInt(args[0], 10);
  const item = items[id];

  const userCollection = client.items.ensure(message.author.id, []);

  if (!item) {
    return message.error('Invalid Item ID!', 'Please provide a valid item ID!');
  }

  if (!userCollection.includes(`${item.name} - ID: ${item.id}`)) {
    return message.error('Item Not Found In Collection!', 'That item is not currently in your collection!');
  }

  client.items.remove(message.author.id, `${item.name} - ID: ${item.id}`);
  const add = await eco.AddToBalance(message.author.id, item.price);
  return message.success(`Successfully Sold ${item.name}!`, `**${message.member.displayName}**, You successfully sold **${item.name}** and got your money back!\nYour new balance is ${client.emoji.money} \`${add.newbalance.toLocaleString()}\` coins!`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['sel'],
  permLevel: 'Verified',
  args: 1,
};

module.exports.help = {
  name: 'sell',
  category: 'economy',
  description: 'Sells the specified item and adds the item amount to your coin count',
  usage: 'sell <item id #>',
  details: '<item id #> => The ID of the item you wish to sell, can be found in the shop command',
};
