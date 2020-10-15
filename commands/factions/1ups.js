// eslint-disable-next-line consistent-return
module.exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // Ensure the factionSettings object exists
  const factionSettings = client.factionSettings.ensure(message.guild.id, client.config.factionSettings);

  // Find the character provided in the chars array
  const { chars } = factionSettings;
  const character = chars.find((char) => args.find((a) => a.toLowerCase() === char.toLowerCase()));

  // If no character was found, error on invalid faction
  if (!character) {
    return message.error('Invalid Faction!', `Please provide a current faction to edit 1ups for or set the current factions using \`${client.getSettings(message.guild).prefix}battle -start\`!`);
  }

  // Parses provided 1ups into an integer
  const queuedOneUps = parseInt(args.find((num) => !isNaN(num) && num !== character), 10); // eslint-disable-line no-restricted-globals

  // If no 1ups were provided, error on invalid number
  if (!queuedOneUps) {
    return message.error('Invalid Number!', 'Please supply a number!');
  }

  // If the add flag is provided, add provided number of 1ups to the faction and display a success message
  // If the remove flag is provided, remove the provided number of 1ups from the faction and display a success message
  // If neither flag is provided, error on invalid flag
  switch (message.flags[0]) {
    case 'add':
      client.factionSettings.math(message.guild.id, '+', queuedOneUps, `oneups.${character}`);
      message.success('Success!', `Successfully added a **${queuedOneUps}-Up** to **${character}!**`);
      break;
    case 'remove':
      client.factionSettings.math(message.guild.id, '-', queuedOneUps, `oneups.${character}`);
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
