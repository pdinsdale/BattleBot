// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, [cmd], level) => {
  switch (message.flags[0]) {
    case 'enable':
      client.enabledCmds.set(cmd, true, 'enabled');
      message.success('Success!', `I've successfully enabled the \`${cmd}\` command!`);
      break;
    case 'disable':
      client.enabledCmds.set(cmd, false, 'enabled');
      message.success('Success!', `I've successfully disabled the \`${cmd}\`command!`);
      break;
    case 'enableAll': {
      const commands = client.commands.keyArray();

      commands.forEach((c) => {
        if (!client.commands.get(c)) {
          client.enabledCmds.set(c, { enabled: true });
        } else {
          client.enabledCmds.set(c, true, 'enabled');
        }
      });

      message.success('Success!', "I've successfully enabled all commands!");
      break;
    }
    case 'disableAll': {
      const commands = client.commands.keyArray();

      commands.forEach((c) => {
        if (!client.commands.get(c)) {
          client.enabledCmds.set(c, { enabled: false });
        } else {
          client.enabledCmds.set(c, false, 'enabled');
        }
      });

      message.success('Success!', "I've successfully disabled all commands!");
      break;
    }
    default:
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
