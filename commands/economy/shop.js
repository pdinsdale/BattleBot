const items = require('./items.json');

module.exports.run = (client, message, args, level, Discord) => {
  const embed = new Discord.RichEmbed()
    .setTitle('Shop')
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setColor('RANDOM')
    .setDescription(`Use \`${client.getSettings(message.guild).prefix}buy [item ID #]\` to buy an item!`)
    .setFooter(`Created and Maintained by ${client.fetchOwner().tag} | ${client.version}`, client.user.displayAvatarURL)
    .setTimestamp();

  const userItems = client.items.ensure(message.author.id, []);

  const final = [];
  for (let i = 0; i < 5; i++) {
    let item = items[Math.floor(Math.random() * items.length)];

    if (!final.includes(item.id)) {
      if (userItems.includes(`${item.name} - ID: ${item.id}`) && userItems.length > 75) {
        item = items.find((x) => !userItems.includes(`${x.name} - ID: ${x.id}`));
      }
      const inItems = userItems.includes(`${item.name} - ID: ${item.id}`) ? `- ${client.emoji.checkMark} In collection!` : '';
      embed.addField(`${item.name}: ${client.emoji.money} ${item.price.toLocaleString()} coins`, `ID: ${item.id} ${inItems}`);
      final.push(item.id);
    } else {
      i -= 1;
    }
  }

  return message.channel.send(embed);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['sh'],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'shop',
  category: 'economy',
  description: 'Displays the items available for purchase',
  usage: 'shop',
};
