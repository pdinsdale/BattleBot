/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
module.exports = {
  name: 'reload',
  category: 'system',
  description: 'Deletes and reloads the cache of the specified command',
  usage: '[Cmd Folder] [Cmd Name]',
  args: '[Cmd Folder => The folder of the command \n[Cmd Name] => Name of the command',
  owneronly: true,
  async run(client, message, args) {
    const cmdFolder = args[0];
    const cmdName = args[1];
    const props = require(`../../commands/${cmdFolder}/${cmdName}.js`);

    function reload() {
      delete require.cache[require.resolve(`../../commands/${cmdFolder}/${cmdName}.js`)];

      console.log(`Attempting to reload command ${cmdName}`);
      return client.commands.set(cmdName, props);
    }

    try {
      reload();
    } catch (e) {
      return message.reply(`Unable to reload command \`${cmdName}\``);
    }

    return message.reply(`Successfully reloaded \`${cmdName}\``);
  },
};
