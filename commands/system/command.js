// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, [cmd], level) => {
  switch (message.flags[0]) {
    case 'enable':
      // Set the provided command to enabled in the enabledCmds Enmap and display a success message
      client.enabledCmds.set(cmd, true, 'enabled');
      message.success('Success!', `I've successfully enabled the \`${cmd}\` command!`);
      break;
    case 'disable':
      // Set the provided command to disabled in the enabledCmds Enmap and display a success message
      client.enabledCmds.set(cmd, false, 'enabled');
      message.success('Success!', `I've successfully disabled the \`${cmd}\`command!`);
      break;
    case 'enableAll': {
      // Get names of all commands and store them in an array called commands
      const commands = client.commands.keyArray();

      // For each command, enable it in the enabledCmds Enmap
      commands.forEach((c) => {
        client.enabledCmds.set(c, { enabled: true });
      });

      // Display a success message
      message.success('Success!', "I've successfully enabled all commands!");
      break;
    }
    case 'disableAll': {
      // Get names of all commands and store them in an array called commands
      const commands = client.commands.keyArray();

      // For each command, disable it in the enabledCmds Enmap
      commands.forEach((c) => {
        if (!client.commands.get(c)) {
          client.enabledCmds.set(c, { enabled: false });
        } else {
          client.enabledCmds.set(c, false, 'enabled');
        }
      });

      // Display a success message
      message.success('Success!', "I've successfully disabled all commands!");
      break;
    }
    default:
      // If an invalid flag is provided, error on invalid flag
      message.error('Invalid Flag!', `Remember to use flags when using this command! For example: \`-enable\` or \`-disable\`! For further details, use \`${client.getSettings(message.guild).prefix}help command\`!`);
      break;
  }
};

module.exports.conf = {
  guildOnly: false,
  aliases: ['cmd'],
  permLevel: 'Mod',
  args: 2,
};

module.exports.help = {
  name: 'command',
  category: 'system',
  description: 'Controls command settings',
  usage: 'command <-enable|-disable> <command name>',
};
