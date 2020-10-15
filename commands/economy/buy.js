const items = require('./items.json');

module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  // Parse the id from the provided arguments
  const id = parseInt(args[0], 10);
  // Find the item with the parsed id
  const item = items[id];

  // Ensure the author has an entry in the items Enmap
  client.items.ensure(message.author.id, []);

  // If item doesn't exist, error on invalid item id
  if (!item) {
    return message.error('Invalid Item ID!', 'Please ensure the item ID is correct! IDs span from **0-99!**');
  }

  // Fetch user balance from economy database
  const ecoB = await eco.FetchBalance(message.author.id);
  // If user balance is less than the price of the item, error on insufficient funds
  if (ecoB.balance < item.price) {
    return message.error('Insufficient Funds!', `You do not have enough starbits to purchase this item!\nCurrent balance: ${starbits} \`${ecoB.balance.toLocaleString()}\` starbits`);
  }

  // Push the bought item to the user's "collection" in the item Enmap
  client.items.push(message.author.id, `${item.name} - ID: ${item.id}`, null, true);
  // Subtract the item's price from the user's balance
  const sub = await eco.SubtractFromBalance(message.author.id, item.price);
  // Display a success message
  return message.success(`Successfully Bought ${item.name}!`, `**${message.member.displayName}**, You successfully bought **${item.name}** and added it to you collection!\nYour new balance is ${starbits} \`${sub.newbalance.toLocaleString()}\` starbits!\nTo see your collection, use \`${client.getSettings(message.guild).prefix}items\`!`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['b'],
  permLevel: 'Verified',
  args: 1,
};

module.exports.help = {
  name: 'buy',
  category: 'economy',
  description: 'Adds the specified item to your collection and deducts the item amount from your starbit count',
  usage: 'buy <item id #>',
  details: '<item id #> => The ID of the item you wish to buy, can be found in the shop command',
};
