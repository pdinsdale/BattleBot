module.exports.run = (client, message, [command], level) => {
  // Get the guild settings
  const settings = client.getSettings(message.guild);

  // If no command is provided, bring up the full help menu
  if (!command) {
    // Filter all commands so none are shown that are above the user's permlevel and that are disabled
    let commands = client.commands.filter((cmd) => client.levelCache[cmd.conf.permLevel] <= level
      && client.enabledCmds.get(cmd.help.name).enabled === true);

    // If the message was not sent in a guild, filter the commands to not show guildOnly ones
    if (!message.guild) {
      commands = client.commands.filter((cmd) => client.levelCache[cmd.conf.permLevel] <= level
        && cmd.conf.guildOnly === false);
    }

    // Get all names and find the longest one in terms of string length
    const commandNames = commands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    // Building the help menu then send it with the asciidoc code
    let currentCategory = '';
    let output = `= Command List =\n\n[Use ${settings.prefix}help <command name> for details]\n`;
    const sorted = commands.array().sort((p, c) => (p.help.category > c.help.category ? 1 // eslint-disable-line no-nested-ternary
      : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1));
    sorted.forEach((c) => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(output, { code: 'asciidoc', split: { char: '\u200b' } });
  } else if (client.commands.has(command) || client.aliases.has(command)) {
    // If provided command exists, get it from the commands Enmap
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    // Start building the output
    let output = `= ${cmd.help.name} = \n${cmd.help.description}\n\nUsage :: ${settings.prefix}${cmd.help.usage}`;

    // If the command has aliases, add them to the output
    if (cmd.conf.aliases) {
      output += `\nAliases :: ${cmd.conf.aliases.join(', ')}`;
    }
    // If the command has details, add them to the output
    if (cmd.help.details) {
      output += `\nDetails :: ${cmd.help.details}`;
    }

    // Add if the command is guildOnly and its permLevel required to the output
    output += `\nGuild Only :: ${cmd.conf.guildOnly}\nPerm Level :: ${cmd.conf.permLevel}`;

    // Send the output
    message.channel.send(output, { code: 'asciidoc' });
  } else {
    // if the command provided does not exist, error on invalid command
    message.error('Invalid Command!', `All valid commands can be found by using \`${settings.prefix}help\`!`);
  }
};

module.exports.conf = {
  guildOnly: false,
  aliases: ['h', 'halp', 'commands'],
  permLevel: 'User',
};

module.exports.help = {
  name: 'help',
  category: 'info',
  description: 'Displays all commands available for your permission level',
  usage: 'help <command>',
};
