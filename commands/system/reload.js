module.exports = {
  name: 'reload',
  description: 'Deletes and reloads the cache of the specified command',
  usage: '[Cmd Folder] [Cmd Name]',
  args: '[Cmd Folder => The folder of the command \n[Cmd Name] => Name of the command',
  owneronly: true,
  async run(client, message, args) {
    // MY COMMAND... Doesn't work and I'm too lazy to fix it

    const cmdFolder = args[0];

    switch (cmdFolder.toLowerCase()) {
      default:
        message.reply('You screwed up you idiot!');
        break;
      case 'factions':
        try {
          delete require.cache[require.resolve(`../commands/factions/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
      case 'fun':
        try {
          delete require.cache[require.resolve(`../commands/fun/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
      case 'help':
        try {
          delete require.cache[require.resolve(`../commands/help/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
      case 'info':
        try {
          delete require.cache[require.resolve(`../commands/info/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
      case 'moderation':
        try {
          delete require.cache[require.resolve(`../commands/moderation/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
      case 'system':
        try {
          delete require.cache[require.resolve(`../commands/system/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
      case 'roles':
        try {
          delete require.cache[require.resolve(`../commands/roles/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
      case 'economy':
        try {
          delete require.cache[require.resolve(`../commands/economy/${args[1]}.js`)];
        } catch (e) {
          return message.channel.send(`Unable to reload: ${args[1]}`);
        } break;
    }

    return message.reply(`Successfully reloaded \`${args[1]}.js\``);
  },
};
