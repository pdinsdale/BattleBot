const items = require('./items.json');

module.exports.run = async (client, message, args, level, Discord, eco) => {
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
  return message.channel.send(`**${message.member.displayName}**, You successfully sold **${item.name}** and got your money back!\nYour new balance is ${client.emoji.money} \`${add.newbalance}\` coins!`);
};

module.exports.conf = {
  enabled: true,
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
