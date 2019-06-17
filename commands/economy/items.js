const items = require('./items.json');
const emoji = require('../../src/emoji');

module.exports = {
  name: 'items',
  category: 'economy',
  description: 'Displays your collection of purchased items',
  aliases: ['item'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const userCollection = client.userItems.ensure(message.author.id, []);
    let coll = userCollection.join('**,\n**');

    const { length } = userCollection;
    let plural = 'items';
    let all;

    if (length === 0) {
      return message.reply("You don't currently have any items in your collection!");
    }
    if (length === 1) {
      plural = 'item';
    }

    const everyItem = [];
    for (let i = 0; i < items.length; i++) {
      if (userCollection.includes(`${items[i].name} - ID: ${items[i].id}`)) {
        everyItem.push(items[i].id);
      }
    }

    if (everyItem.length === items.length) {
      all = `\n\nYou have *all* currently available items! That is quite an achievement! ${emoji.thumbsupio}`;
    } else {
      all = '';
    }

    if (length > 30) {
      coll = [];
      for (let i = 1; i < 31; i++) {
        coll.push(userCollection[length - i]);
      }
      coll = `**Here are your **30** most recently purchased items!\n\n**${coll.join('**,\n**')}`;
    }

    return message.channel.send(`**${message.member.displayName}**, You currently have **${length} ${plural}**!\n\n**${coll}**\n\n *Use \`${client.guildConfig.prefix}sell [Item ID #]\` to sell an item!*${all}`, { split: true });
  },
};
