const items = require('./items.json');

module.exports.run = async (client, message, args, level, Discord, eco) => {
  const id = parseInt(args[0], 10);
  const item = items[id];

  client.userItems.ensure(message.author.id, []);

  if (!item) {
    return message.reply('Please provide a valid item ID!');
  }

  const ecoB = await eco.FetchBalance(message.author.id);
  if (ecoB.balance < item.price) {
    return message.reply(`You do not have enough coins to purchase this item!\nCurrent balance: ${client.emoji.money} \`${ecoB.balance}\` coins`);
  }

  client.userItems.push(message.author.id, `${item.name} - ID: ${item.id}`, null, true);
  const sub = await eco.SubtractFromBalance(message.author.id, item.price);
  return message.channel.send(`**${message.member.displayName}**, You successfully bought **${item.name}** and added it to you collection!\nYour new balance is ${client.emoji.money} \`${sub.newbalance}\` coins!\nTo see your collection, use \`${client.getSettings(message.guild).prefix}items\`!`);
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['b'],
  permLevel: 'Verified',
  args: 1,
};

module.exports.help = {
  name: 'buy',
  category: 'economy',
  description: 'Adds the specified item to your collection and deducts the item amount from your coin count',
  usage: 'buy <item id #>',
  details: '<item id #> => The ID of the item you wish to buy, can be found in the shop command',
};
