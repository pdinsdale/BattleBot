module.exports.run = async (client, message, args, level, Discord) => {
  client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`Created and Maintained by ${client.fetchOwner().tag} | ${client.version}`, client.user.displayAvatarURL);

  let embedMsg;
  const factionSetupMC = async (question, path) => {
    embed.setTitle(question)
      .setDescription('For Yes/No Questions, please respond with either \`true\` or \`false\`.\nFor other questions, please respond using the \`|\` separator.\nEx. \`Mario | Luigi\`\n\nNo command is needed; your entire message should only be a response to the asked question.');

    if (!embedMsg) {
      const msg = await message.channel.send(embed);
      embedMsg = msg.id;
    } else {
      const fetchedEmbed = await message.channel.fetchMessage(embedMsg);
      fetchedEmbed.edit(embed);
    }

    const filter = (m) => (m.content.includes('|') && message.author.id === m.author.id) || (m.content.includes('true') && message.author.id === m.author.id) || (m.content.includes('false') && message.author.id === m.author.id);

    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
      .then((response) => {
        const splitResp = response.first().split('|');
        splitResp.forEach((c) => {
          if (Array.isArray(client.factionSettings.get(message.guild.id, path))) {
            client.factionSettings.push(message.guild.id, c.trim(), path);
          } else {
            client.factionSettings.set(message.guild.id, c, path);
          }
        });
        response.first().delete().catch(console.error);
      })
      .catch((err) => {
        message.error("Time's Up!", 'Time has expired! Run the command again to start over!');
        console.error(err);
      });
  };

  const optionsMC = [
    {
      question: 'Who are the characters for this Faction Battle?',
      path: 'factions.factionChars',
    },
    {
      question: 'What are the role names for this Faction Battle?',
      path: 'factions.factionRoles',
    },
    {
      question: 'Do you wish to allow Team Switching?',
      path: 'factions.teamSwitch',
    },
  ];

  switch (message.flags[0]) {
    case 'start':
      if (client.factionSettings.get(message.guild.id, 'factions.ongoingBattle')) {
        message.error('Battle Already in Progress!', `You cannot start a battle without ending the previous one! Use \`${client.getSettings(message.guild).prefix}battle -end\` to end the current battle!`);
      } else {
        for (let i = 0; i < optionsMC.length; i++) {
          factionSetupMC(optionsMC[i].question, optionsMC[i].path);
        }

        const factionChars = client.factionSettings.get(message.guild.id, 'factions.factionChars');

        const chars = {};
        for (let i = 0; i < factionChars.length; i++) {
          Object.defineProperty(chars, factionChars[i], {
            value: 0,
            writable: true,
          });
        }

        client.factionSettings.set(message.guild.id, chars, 'factions.oneups');

        client.factionSettings.set(message.guild.id, true, 'factions.ongoingBattle');

        embed.setTitle('Faction Battle Fully Set!')
          .setDescription('The Faction Battle is ready to go! Wahoo!');

        message.channel.fetchMessage(embedMsg).edit(embed);
      }
      break;
    case 'end':
      client.factionSettings.set(message.guild.id, client.config.factionSettings);
      message.success('Faction Battle Ended!', 'The current Faction Battle has been ended!');
      break;
    default:
      message.error('Invalid Flag!', `Remember to use flags when using this command! For example: \`-start\` or \`-end\`! For further details, use \`${client.getSettings(message.guild).prefix}help battle\`!`);
      break;
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'Mod',
  args: 1,
};

module.exports.help = {
  name: 'battle',
  category: 'factions',
  description: 'Controls faction battle settings through an interactive dialogue',
  usage: 'battle <-start|-end>',
};
