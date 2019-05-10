module.exports = {
  name: 'items',
  category: 'economy',
  description: 'Displays your collection of purchased items',
  aliases: ['item'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const userCollection = client.userItems.ensure(message.author.id, []);
    userCollection.sort();

    const { length } = userCollection;
    let plural = 'items';

    if (length === 0) {
      return message.reply("You don't currently have any items in your collection!");
    }
    if (length === 1) {
      plural = 'item';
    }

    return message.channel.send(`**${message.member.displayName}**, You currently have **${length} ${plural}**!\n**${userCollection.join('**,\n**')}**\n\n *Use \`${client.guildConfig.prefix}sell [Item ID #]\` to sell an item!*`, { split: true });
  },
};
