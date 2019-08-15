// eslint-disable-next-line consistent-return
module.exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // eslint-disable-next-line max-len
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  const { factionChars } = factionSettings.factions;
  // eslint-disable-next-line max-len
  const character = factionChars.find((char) => message.content.toLowerCase().includes(char.toLowerCase()));

  if (!factionChars.some((char) => message.content.toLowerCase().includes(char.toLowerCase()))) {
    return message.error('Invalid Faction!', `Please provide a current faction to edit 1ups for or set the current factions using \`${client.getSettings(message.guild).prefix}set -config\`!`);
  }

  // Parses args[2] from a string into an integer
  const queuedOneUps = parseInt(args[2], 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(queuedOneUps)) {
    return message.reply('Please supply a number!');
  }

  switch (message.flags[0]) {
    case 'add':
      client.factionSettings.math(message.guild.id, '+', queuedOneUps, `factions.oneups.${character}`);
      message.success('Success!', `Successfully added a **${queuedOneUps}-Up** to **${character}!**`);
      break;
    case 'remove':
      client.factionSettings.math(message.guild.id, '-', queuedOneUps, `factions.oneups.${character}`);
      message.success('Success', `Successfully removed a **${queuedOneUps}-Up** from **${character}!**`);
      break;
    default:
      message.error('Flag Not Detected!', `Remember to use flags when using this command! A flag is only necessary for the operation, for example: \`-add\` or \`-remove\`! For further details, use \`${client.getSettings(message.guild).prefix}help 1ups\`!`);
      break;
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['1up'],
  permLevel: 'Mod',
  args: 3,
};

module.exports.help = {
  name: '1ups',
  category: 'factions',
  description: 'Controls the 1-up database',
  usage: '1ups <-add|-remove> <faction1Name|faction2Name> <number>',
  details: "<-add|-remove> => The operation to use, (notice the -, it's important!) \n<faction1Name|faction2Name> => The name of the character you wish to give 1-ups to \n<number> => Obviously the number of 1-ups to give, 1-∞",
};
