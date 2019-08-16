module.exports.run = (client, message, args, level, Discord) => {
  let staticEmotes = message.guild.emojis.filter((e) => !e.animated).map((e) => `${e.toString()} \`:${e.name}:\``).sort();
  let animatedEmotes = message.guild.emojis.filter((e) => e.animated).map((e) => `${e.toString()} \`:${e.name}:\``).sort();

  const embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL)
    .setColor('GREEN');

  const split = (arr, n) => {
    const res = [];
    while (arr.length) {
      res.push(arr.splice(0, n));
    }
    return res;
  };

  const embedAdd = (arr, emb, str) => {
    for (let i = 0; i < arr.length; i++) {
      if (emb.fields < 1) {
        emb.addField(`${str} Emotes`, arr[i], true);
      } else {
        emb.addField('\u200b', arr[i], true);
      }
    }
  };

  const resultStatic = split(staticEmotes, 10 || staticEmotes.length);
  const resultAnimated = split(animatedEmotes, 10 || animatedEmotes.length);

  switch (message.flags[0]) {
    case 'static':
      if (resultStatic.length) {
        embedAdd(resultStatic, embed, 'Static');

        message.channel.send(embed);
      } else {
        message.error('No Static Emotes Found!', "This server doesn't have any static emotes!");
      }
      break;
    case 'animated': case 'animate':
      if (resultAnimated.length) {
        embedAdd(resultAnimated, embed, 'Animated');

        message.channel.send(embed);
      } else {
        message.error('No Animated Emotes Found!', "This server doesn't have any animated emotes!");
      }
      break;
    case 'all': case 'list':
      staticEmotes = staticEmotes.join('\n');
      animatedEmotes = animatedEmotes.join('\n');

      if (staticEmotes.length > 6000 || animatedEmotes.length > 6000) {
        message.channel.send(`**Static Emotes**\n${staticEmotes}\n\n**Animated Emotes**\n${animatedEmotes}\n\n*Could not send embed due to character limit*`, { split: true });
      } else {
        if (resultStatic.length) {
          const staticEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL)
            .setColor('GREEN');

          embedAdd(resultStatic, staticEmbed, 'Static');
          message.channel.send(staticEmbed);
        }

        if (resultAnimated.length) {
          const animatedEmbed = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL)
            .setColor('GREEN');

          embedAdd(resultAnimated, animatedEmbed, 'Animated');
          message.channel.send(animatedEmbed);
        }
      }
      break;
    default:
      message.error('Invalid Flag!', `Remember to use flags when using this command! For example: \`-static\`, \`-animated\`, or \`-all\`! For further details, use \`${client.getSettings(message.guild).prefix}help emotes\`!`);
      break;
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['emojis', 'emoji', 'emote'],
  permLevel: 'User',
  args: 1,
};

module.exports.help = {
  name: 'emotes',
  category: 'misc',
  description: "Lists a server's emotes",
  usage: 'emotes <-static|-animated|-all>',
  details: "<-static|-animated|-all> => Whether to show static emotes, animated emotes, or all emotes. (Notice the - it's important",
};
