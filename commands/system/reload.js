/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
module.exports = {
  name: 'reload',
  category: 'system',
  description: 'Deletes the cache and reloads the specified command',
  usage: '[command name]',
  args: '[command name] => Any valid command name',
  owneronly: true,
  run(client, message, args) {
    const cmdName = args[0];

    if (!client.commands.has(cmdName)) {
      return message.reply("That's not a valid command!");
    }

    const { category } = client.commands.get(cmdName);
    const props = require(`../../commands/${category}/${cmdName}`);

    delete require.cache[require.resolve(`../../commands/${category}/${cmdName}.js`)];
    client.commands.set(cmdName, props);
    console.log(`${cmdName} command was reloaded!`);
    return message.channel.send(`Reloaded command \`${cmdName}\`!`);
  },
};
