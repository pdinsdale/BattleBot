const items = require('./items.json');

module.exports.run = async (client, message, args, level, Discord) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);

  // Build the initial embed of the shop embed
  const owner = await client.fetchOwner();
  const embed = new Discord.MessageEmbed()
    .setTitle('Shop')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'gif' }))
    .setColor('RANDOM')
    .setDescription(`Use \`${client.getSettings(message.guild).prefix}buy [item ID #]\` to buy an item!`)
    .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
    .setTimestamp();

  // Ensure the user has a collection in the items Enmap
  const userItems = client.items.ensure(message.author.id, []);

  // Find 5 random items that are not in the user's collection and add them to the shop embed
  const final = [];
  for (let i = 0; i < 5; i++) {
    let item = items[Math.floor(Math.random() * items.length)];

    if (!final.includes(item.id)) {
      if (userItems.includes(`${item.name} - ID: ${item.id}`) && userItems.length > 75) {
        item = items.find((x) => !userItems.includes(`${x.name} - ID: ${x.id}`));
      }
      const inItems = userItems.includes(`${item.name} - ID: ${item.id}`) ? `- ${client.emoji.checkMark} In collection!` : '';
      embed.addField(`${item.name}: ${starbits} ${item.price.toLocaleString()} starbits`, `ID: ${item.id} ${inItems}`);
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
