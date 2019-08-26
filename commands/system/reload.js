/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  const { name } = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
  // eslint-disable-next-line max-len
  const { category } = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

  if (!client.commands.has(name)) {
    return message.reply("That's not a valid command!");
  }

  const props = require(`../../commands/${category}/${name}`);

  delete require.cache[require.resolve(`../../commands/${category}/${name}.js`)];
  client.commands.set(name, props);

  console.log(`${name} command was reloaded!`);
  return message.channel.send(`Reloaded command \`${name}\`!`);
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
