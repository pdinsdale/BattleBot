const items = require('./items.json');

module.exports = {
  name: 'shop',
  category: 'economy',
  description: 'Displays the items available for purchase',
  aliases: ['sh'],
  usage: ' ',
  async run(client, message, args, Discord) {
    const embed = new Discord.RichEmbed()
      .setTitle('Shop')
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setColor('RANDOM')
      .setDescription(`Use \`${client.guildConfig.prefix}buy [item ID #]\` to buy an item!`)
      .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
      .setTimestamp();

    const userItems = client.userItems.ensure(message.author.id, []);

    const final = [];

    for (let i = 0; i < 5; i++) {
      const item = items[Math.floor(Math.random() * items.length)];
      let inItems = ' ';

      if (!final.includes(item.id)) {
        if (userItems.includes(`${item.name} - ID: ${item.id}`)) {
          inItems = '- ✅ In collection!';
        }
        embed.addField(`${item.name}: :money_with_wings: ${item.price} coins`, `ID: ${item.id} ${inItems}`);
        final.push(item.id);
      } else {
        i -= 1;
      }
    }

    return message.channel.send(embed);
  },
};
