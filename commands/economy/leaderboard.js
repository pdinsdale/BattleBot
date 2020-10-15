module.exports.run = async (client, message, args, level, Discord, eco) => {
  // If a user was mentioned, find them on the leaderboard and display their placement
  if (message.mentions.users.first()) {
    const output = await eco.Leaderboard({
      search: message.mentions.users.first().id,
    });

    message.channel.send(`**${message.mentions.users.first().tag}** is number \`${output}\` on the leaderboard!`);
  } else {
    // Find the user's placement on the leaderboard
    const authorPlace = await eco.Leaderboard({
      search: message.author.id,
    });

    // Build the initial embed of the leaderboard
    const owner = await client.fetchOwner();
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${message.guild.name}'s Economy Leaderboard`)
      .setDescription(`You're currently number **${authorPlace}** on the leaderboard!`)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ format: 'gif' }))
      .setFooter(`Created and Maintained by ${owner.tag} | v${client.version}`);

    // Get the top 10 users on the leaderboard, fetch their user objects, and add them to the leaderboard embed
    eco.Leaderboard({
      limit: 10,
    }).then(async (users) => {
      for (let i = 0; i < 10; i++) {
        // eslint-disable-next-line no-await-in-loop
        const user = await client.users.fetch(users[i].userid);

        if (users[i]) {
          embed.addField(`**${i + 1} -**  ${user.tag}`, `Balance: \`${parseInt(users[i].balance, 10).toLocaleString()} starbits\``);
        } else {
          embed.addField(`**${i + 1} -** \`Nobody Yet\``);
        }
      }

      message.channel.send(embed);
    });
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['lb', 'leaders', 'leader'],
  permLevel: 'Verified',
};

module.exports.help = {
  name: 'leaderboard',
  category: 'economy',
  description: 'Shows the top 10 users on the server. If a user is mentioned, tells the position of the user on the leaderboard',
  usage: 'leaderboard <@user>',
  details: '<@user> => (Optional) Any valid member of the server',
};
