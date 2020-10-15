// Require the items.json file
const items = require('./items.json');

// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  // Ensure the user has a collection in the items database. If they do, join it with some Discord Markdown
  const userCollection = client.items.ensure(message.author.id, []);
  let coll = userCollection.join('**,\n**');

  // If length of the user's collection is greater than 1, make sure to make "item" plural
  const { length } = userCollection;
  const plural = length === 1 ? 'item' : 'items';

  // If no items are in the user's collection, error on no items found
  if (length === 0) {
    return message.error('No Items Found!', "You don't currently have any items in your collection!");
  }

  // Find if user has all available items
  let n = 0;
  for (let i = 0; i < items.length; i++) {
    if (userCollection.includes(`${items[i].name} - ID: ${items[i].id}`)) {
      n += 1;
    }
  }

  const thumbsupio = client.emojis.cache.get(client.emoji.thumbsupio);
  const all = n === items.length ? `\n\nYou have *all* currently available items! That is quite an achievement! ${thumbsupio}` : '';

  // If length of collection is greater than 30, only display the 30 most recently purchased items
  if (length > 30) {
    coll = [];
    for (let i = 1; i < 31; i++) {
      coll.push(userCollection[length - i]);
    }
    coll = ` **Here are your **30** most recently purchased items!\n\n**${coll.join('**,\n**')}`;
  }

  // Calculate duplicates in the user's collection
  const count = userCollection.reduce((a, b) => ({
    ...a,
    [b]: (a[b] || 0) + 1,
  }), {});
  const duplicates = Object.keys(count).filter((a) => count[a] > 1);
  const dupes = duplicates.length ? `You have **${duplicates.length} duplicate item(s)!** Current duplicates:\n**${duplicates.join('**,\n**')}**\n\n` : '';

  // Display items
  return message.channel.send(`**${message.member.displayName}**, You currently have **${length} ${plural}**!\n\n**${coll}**\n\n ${dupes}*Use \`${client.getSettings(message.guild).prefix}sell [Item ID #]\` to sell an item!*${all}`, { split: true });
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['item', 'inventory', 'inv'],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'items',
  category: 'economy',
  description: 'Displays your collection of purchased items',
  usage: 'items',
};
