/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

// Require necessary dependencies
const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');

// Create the client instance, require config.json, emoji.js, and the version from package.json
const client = new Discord.Client({ fetchAllMembers: true });
const config = require('./config');
const { version } = require('./package.json');
const emoji = require('./src/emoji');

// Bind all functions in functions.js to the client
require('./src/functions')(client);

// Bind the config object, the version, and the emoji object to the client so they can be used everywhere
client.config = config;
client.version = `v${version}`;
client.emoji = emoji;

// Read the events directory
fs.readdir('./events/', (err, files) => {
  // If an error occurs, output to the console
  if (err) {
    return console.error(err);
  }

  // For each file in the events directory, require it, get the name, and bind it to the client, allowing the client object to be used in every event
  return files.forEach((file) => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

// Create new non-persistant Enamps for commands and aliases
client.commands = new Enmap();
client.aliases = new Enmap();

// Read the commands directory
fs.readdir('./commands/', (err, folders) => {
  // If an error occurs, output to the console
  if (err) {
    return console.error(err);
  }

  // Looping over all folders to load all commands
  for (let i = 0; i < folders.length; i++) {
    // Read the next folder in the folders array
    fs.readdir(`./commands/${folders[i]}/`, (error, files) => {
      // If an error occurs, output to the console
      if (error) {
        return console.error(error);
      }

      // Loop through all files in the folder
      files.forEach((file) => {
        // If the file isn't a .js file and thus not a command file, return
        if (!file.endsWith('.js')) {
          return;
        }

        // Require the object we exported from the command
        const props = require(`./commands/${folders[i]}/${file}`);
        const commandName = props.help.name;

        // Set the command name and its properties in the client.commands Enmap
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);

        // If the command has aliases, set them in the client.aliases Enmap
        if (props.conf.aliases) {
          props.conf.aliases.forEach((alias) => {
            client.aliases.set(alias, commandName);
          });
        }

        // Ensure the command is in the enabledCmds Enmap, and if not, set its value to true
        client.enabledCmds.ensure(commandName, { enabled: true });
      });
    });
  }
});

// For each permLevel in config.js, set its value in the levelCache object
client.levelCache = {};
for (let i = 0; i < config.permLevels.length; i++) {
  const thislvl = config.permLevels[i];
  client.levelCache[thislvl.name] = thislvl.level;
}

// Define multiple Enmaps and bind them to the client so they can be used everywhere (ie. client.settings, client.factionSettings, etc.)
Object.assign(client, Enmap.multi(['settings', 'factionSettings', 'blacklist', 'items', 'friendCodes', 'results', 'enabledCmds', 'teamSettings', 'selfAssignRoles', 'userDB'], { ensureProps: true }));

// Login to the Discord API using the token in config.js
client.login(config.token);
