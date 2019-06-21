module.exports = {
  name: 'emotes',
  category: 'misc',
  description: "Lists the server's emotes",
  aliases: ['emote', 'emoji', 'emojis'],
  usage: ' ',
  // eslint-disable-next-line consistent-return
  async run(client, message, args, Discord) {
    let staticEmotes = message.guild.emojis.filter(e => !e.animated).map(e => `${e.toString()} \`:${e.name}:\``).sort();
    let animatedEmotes = message.guild.emojis.filter(e => e.animated).map(e => `${e.toString()} \`:${e.name}:\``).sort();

    const embed = new Discord.RichEmbed()
      .setAuthor(`${message.guild.name}'s Emotes`, message.guild.iconURL)
      .setColor('GREEN');

    function split(arr, n) {
      const res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return res;
    }

    function embedAdd(arr, emb, str) {
      for (let i = 0; i < arr.length; i++) {
        if (emb.fields < 1) {
          emb.addField(`${str} Emotes`, arr[i], true);
        } else {
          emb.addField('\u200b', arr[i], true);
        }
      }
    }

    const resultStatic = split(staticEmotes, 10 || staticEmotes.length);
    const resultAnimated = split(animatedEmotes, 10 || animatedEmotes.length);

    if (args[0] === 'static') {
      if (resultStatic.length) {
        embedAdd(resultStatic, embed, 'Static');

        message.channel.send(embed);
      } else {
        message.channel.send("This server doesn't have any static emotes!");
      }
    } else if (args[0] === 'ani' || args[0] === 'animated' || args[0] === 'animate') {
      if (resultAnimated.length) {
        embedAdd(resultAnimated, embed, 'Animated');

        message.channel.send(embed);
      } else {
        message.channel.send("This server doesn't have any animated emotes!");
      }
    } else if (args[0] === 'all' || args[0] === 'list') {
      staticEmotes = staticEmotes.join('\n');
      animatedEmotes = animatedEmotes.join('\n');

      if (staticEmotes.length > 6000 || animatedEmotes.length > 6000) {
        return message.channel.send(`**Static Emotes**\n${staticEmotes}\n\n**Animated Emotes**\n${animatedEmotes}\n\n*Could not send embed due to character limit*`, { split: true });
      }

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
        return message.channel.send(animatedEmbed);
      }
    } else {
      // eslint-disable-next-line no-useless-escape
      return message.reply('Please specify what emotes to show!\nOptions are: \`static, animated, all\`');
    }
  },
};
