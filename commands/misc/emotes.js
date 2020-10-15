module.exports.run = (client, message, args, level, Discord) => {
  // Find static emotes and animated emotes and sort them
  let staticEmotes = message.guild.emojis.cache.filter((e) => !e.animated).map((e) => `${e.toString()} \`:${e.name}:\``).sort();
  let animatedEmotes = message.guild.emojis.cache.filter((e) => e.animated).map((e) => `${e.toString()} \`:${e.name}:\``).sort();

  // Build the initial emotes embed
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL({ format: 'gif' }))
    .setColor('GREEN');

  // Simple split functon
  const split = (arr, n) => {
    const res = [];
    while (arr.length) {
      res.push(arr.splice(0, n));
    }
    return res;
  };

  // Helper method to add fields to the embed
  const embedAdd = (arr, emb, str) => {
    for (let i = 0; i < arr.length; i++) {
      if (emb.fields < 1) {
        emb.addField(`${str} Emotes`, arr[i], true);
      } else {
        emb.addField('\u200b', arr[i], true);
      }
    }
  };

  // Spit static and animated emote arrays so only 10 emotes are in each
  const resultStatic = split(staticEmotes, 10 || staticEmotes.length);
  const resultAnimated = split(animatedEmotes, 10 || animatedEmotes.length);

  switch (message.flags[0]) {
    case 'static':
      // If the static emotes array is not empty, run the helper method to add fields to the embed and send the embed
      // If it is empty, error on no static emotes
      if (resultStatic.length) {
        embedAdd(resultStatic, embed, 'Static');

        message.channel.send(embed);
      } else {
        message.error('No Static Emotes Found!', "This server doesn't have any static emotes!");
      }
      break;
    case 'animated': case 'animate':
      // If the animated emotes array is not empty, run the helper method to add fields to the embed and send the embed
      // If it is empty, error on no animated emotes
      if (resultAnimated.length) {
        embedAdd(resultAnimated, embed, 'Animated');

        message.channel.send(embed);
      } else {
        message.error('No Animated Emotes Found!', "This server doesn't have any animated emotes!");
      }
      break;
    case 'all': case 'list':
      // Join both arrays via a new line to find length
      staticEmotes = staticEmotes.join('\n');
      animatedEmotes = animatedEmotes.join('\n');

      // If the length of either string is over 6000, don't use an embed
      if (staticEmotes.length > 6000 || animatedEmotes.length > 6000) {
        message.channel.send(`**Static Emotes**\n${staticEmotes}\n\n**Animated Emotes**\n${animatedEmotes}\n\n*Could not send embed due to character limit*`, { split: true });
      } else {
        // If the static emotes array is not empty, run the helper method to add fields to the embed and send the embed
        // We need to create separate embeds so one does not overwrite the other
        if (resultStatic.length) {
          const staticEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL({ format: 'gif' }))
            .setColor('GREEN');

          embedAdd(resultStatic, staticEmbed, 'Static');
          message.channel.send(staticEmbed);
        }

        // If the animated emotes array is not empty, run the helper method to add fields to the embed and send the embed
        if (resultAnimated.length) {
          const animatedEmbed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL({ format: 'gif' }))
            .setColor('GREEN');

          embedAdd(resultAnimated, animatedEmbed, 'Animated');
          message.channel.send(animatedEmbed);
        }
      }
      break;
    default:
      // If an invalid flag is used, error on invalid flag
      message.error('Invalid Flag!', `Remember to use flags when using this command! For example: \`-static\`, \`-animated\`, or \`-all\`! For further details, use \`${client.getSettings(message.guild).prefix}help emotes\`!`);
      break;
  }
};

module.exports.conf = {
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
