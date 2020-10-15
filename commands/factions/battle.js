module.exports.run = async (client, message, args, level, Discord) => {
  // Ensure the factionSettings exists in the Enmap
  client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  // Build the initial battle embed
  const owner = await client.fetchOwner();
  const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'gif' }))
    .setTimestamp()
    .setColor('RANDOM')
    .setFooter(`Created and Maintained by ${owner.tag} | ${client.version}`, client.user.displayAvatarURL())
    .setDescription('For Yes/No Questions, please respond with either \`true\` or \`false\`.\nFor other questions, please respond using the \`|\` separator.\nEx. \`Mario | Luigi\`\n\nNo command is needed; your entire message should only be a response to the asked question.');

  // Define a function to be called each time a new option in the battle is set
  let embedMsg;
  const factionSetupMC = async (question, path) => {
    // Set embed title to the question
    embed.setTitle(question);

    // If there's not an existing message, send the initial embed and save the id.
    // If there is, get that message and edit the embed
    if (!embedMsg) {
      const msg = await message.channel.send(embed);
      embedMsg = msg.id;
    } else {
      const fetchedEmbed = message.channel.messages.cache.get(embedMsg) || await message.channel.messages.fetch(embedMsg);
      fetchedEmbed.edit(embed);
    }

    // Ensure the message provided includes either the "|" separater or true/false
    const filter = (m) => m.content.includes('|') || m.content.includes('true') || m.content.includes('false');

    // Await messages from the channel, taking a max of 1 and erroring after 1 minute
    return message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
      .then((response) => {
        // Split the response by the separater
        const splitResp = response.first().content.split('|');
        // If the path needed is an array (ie. is the chars path or roles path) push each value to the path array
        // If not, set the value to the response (true or false)
        splitResp.forEach((c) => {
          if (Array.isArray(client.factionSettings.get(message.guild.id, path))) {
            client.factionSettings.push(message.guild.id, c.trim(), path);
          } else {
            client.factionSettings.set(message.guild.id, c, path);
          }
        });
        // Delete the response
        response.first().delete().catch(console.error);
      })
      .catch((err) => {
        // If an error occurs, error on time and send an error log to the console
        message.error("Time's Up!", 'Time has expired! Run the command again to start over!');
        console.error(err);
      });
  };

  // Questions and their respective paths in the Enmap
  const optionsMC = [
    {
      question: 'Who are the characters for this Faction Battle?',
      path: 'chars',
    },
    {
      question: 'What are the role names for this Faction Battle?',
      path: 'roles',
    },
    {
      question: 'Do you wish to allow Team Switching?',
      path: 'teamSwitch',
    },
  ];

  switch (message.flags[0]) {
    case 'start':
      // If there is already a battle in progress, error on battle in progress
      if (client.factionSettings.get(message.guild.id, 'factions.ongoingBattle')) {
        message.error('Battle Already in Progress!', `You cannot start a battle without ending the previous one! Use \`${client.getSettings(message.guild).prefix}battle -end\` to end the current battle!`);
      } else {
        // For each question and path, run the factionSetupMC method
        for (let i = 0; i < optionsMC.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          await factionSetupMC(optionsMC[i].question, optionsMC[i].path);
        }

        // Get the chars of this battle and set their oneups to 0
        const factionChars = client.factionSettings.get(message.guild.id, 'chars');
        const chars = {};
        for (let i = 0; i < factionChars.length; i++) {
          chars[factionChars[i]] = 0;
        }
        client.factionSettings.set(message.guild.id, chars, 'oneups');
        client.factionSettings.set(message.guild.id, true, 'ongoingBattle');

        // Edit the embed title and description to complete the battle setup
        embed.setTitle('Faction Battle Fully Set!')
          .setDescription('The Faction Battle is ready to go! Wahoo!');

        message.channel.messages.fetch(embedMsg)
          .then((msg) => msg.edit(embed))
          .catch(console.error);
      }
      break;
    case 'end':
      // Reset all settings to their default options and display a success message
      client.factionSettings.set(message.guild.id, client.config.factionSettings);
      message.success('Faction Battle Ended!', 'The current Faction Battle has been ended and all data relating to it has been reset!');
      break;
    default:
      // If a valid flag is not provided, error on invalid flag
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
