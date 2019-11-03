// eslint-disable-next-line consistent-return
module.exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  const { factionChars } = factionSettings.factions;
  const character = factionChars.find((char) => message.content.toLowerCase().includes(char.toLowerCase()));

  if (!character) {
    return message.error('Invalid Faction!', `Please provide a current faction to edit 1ups for or set the current factions using \`${client.getSettings(message.guild).prefix}battle -start\`!`);
  }

  // Parses args from a string into an integer
  // eslint-disable-next-line no-restricted-globals
  const queuedOneUps = parseInt(args.find((num) => !isNaN(num)), 10);

  // eslint-disable-next-line no-restricted-globals
  if (!queuedOneUps) {
    return message.error('Invalid Number!', 'Please supply a number!');
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
      message.error('Invalid Flag!', `Remember to use flags when using this command! A flag is only necessary for the operation, for example: \`-add\` or \`-remove\`! For further details, use \`${client.getSettings(message.guild).prefix}help 1ups\`!`);
      break;
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['1up'],
  permLevel: 'Mod',
  args: 3,
};

module.exports.help = {
  name: '1ups',
  category: 'factions',
  description: 'Controls the 1-up database',
  usage: '1ups <-add|-remove> <character> <number>',
  details: "<-add|-remove> => The operation to use, (notice the - it's important!) \n<character> => The name of the character you wish to give 1-ups to \n<number> => Obviously the number of 1-ups to give, 1-∞",
};
