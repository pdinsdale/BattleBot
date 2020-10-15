/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  // Get the command provided from client.commands
  // if an alias is given, find its corresponding command
  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

  // if no command is found, error on invlaid command
  if (!command) {
    return message.error('Invalid Command!', "That's not a valid command!");
  }

  // Delete the cache of the command file
  delete require.cache[require.resolve(`../../commands/${command.help.category}/${command.help.name}.js`)];

  // Require the object exported from the updated command file set it in the commands Enmap
  const props = require(`../../commands/${command.help.category}/${command.help.name}`);
  client.commands.set(command.help.name, props);

  // Log the reload and display a success message
  console.log(`${command.help.name} command was reloaded!`);
  return message.success('Success!', `Successfully reloaded command \`${command.help.name}\`!`);
};

module.exports.conf = {
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin',
  args: 1,
};

module.exports.help = {
  name: 'reload',
  category: 'system',
  description: 'Deletes the cache and reloads the speciied command',
  usage: 'reload <command name>',
  details: '<command name> => Any valid command name',
};
