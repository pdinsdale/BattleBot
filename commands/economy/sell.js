const items = require('./items.json');

module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  // Parse the id from args
  const id = parseInt(args[0], 10);
  // Get the item from items.json that corresponds with the parsed id
  const item = items[id];

  // Ensure the user has a collection in the items Enmap
  const userCollection = client.items.ensure(message.author.id, []);

  // If the parsed item does not exist, error an invalid item id
  if (!item) {
    return message.error('Invalid Item ID!', 'Please provide a valid item ID!');
  }

  // If the parsed item was not found in the user's collection, error on item not found in collection
  if (!userCollection.includes(`${item.name} - ID: ${item.id}`)) {
    return message.error('Item Not Found In Collection!', 'That item is not currently in your collection!');
  }

  // Remove the parsed item from the user's collection, add the price to the user's balance, and display a success message
  client.items.remove(message.author.id, `${item.name} - ID: ${item.id}`);
  const add = await eco.AddToBalance(message.author.id, item.price);
  return message.success(`Successfully Sold ${item.name}!`, `**${message.member.displayName}**, You successfully sold **${item.name}** and got your money back!\nYour new balance is ${starbits} \`${add.newbalance.toLocaleString()}\` starbits!`);
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
