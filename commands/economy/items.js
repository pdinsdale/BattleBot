const items = require('./items.json');
const emoji = require('../../src/emoji');

// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  const userCollection = client.userItems.ensure(message.author.id, []);
  let coll = userCollection.join('**,\n**');

  const { length } = userCollection;
  const plural = length === 1 ? 'item' : 'items';

  if (length === 0) {
    return message.reply("You don't currently have any items in your collection!");
  }

  let n = 0;
  for (let i = 0; i < items.length; i++) {
    if (userCollection.includes(`${items[i].name} - ID: ${items[i].id}`)) {
      n += 1;
    }
  }

  const thumbsupio = client.emojis.get(emoji.thumbsupio);
  const all = n === items.length ? `\n\nYou have *all* currently available items! That is quite an achievement! ${thumbsupio}` : '';

  if (length > 30) {
    coll = [];
    for (let i = 1; i < 31; i++) {
      coll.push(userCollection[length - i]);
    }
    coll = ` **Here are your **30** most recently purchased items!\n\n**${coll.join('**,\n**')}`;
  }

  return message.channel.send(`**${message.member.displayName}**, You currently have **${length} ${plural}**!\n\n**${coll}**\n\n *Use \`${client.getSettings(message.guild).prefix}sell [Item ID #]\` to sell an item!*${all}`, { split: true });
};

module.exports.conf = {
  enabled: true,
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
