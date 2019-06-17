/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Bot Version 1.2.1

// Standard importing modules and crap
const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');

// Defining client and config
const client = new Discord.Client();
const config = require('./config.json');
require('./src/functions.js')(client);

// Attaching the client to the config file so it can be used anywhere
client.config = config;

// Attaching the bot version to the client so it can be used anywhere
const { version } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
client.version = `v${version}`;

// Reading and doing stuff to make events work
fs.readdir('./events/', (err, files) => {
  if (err) {
    return console.error(err);
  }
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

// Setting up an Enmap for commands
client.commands = new Enmap();

fs.readdir('./commands/', (err, folders) => {
  if (err) {
    return console.error(err);
  }

  // Looping over all folders to load all commands
  for (let i = 0; i < folders.length; i++) {
    fs.readdir(`./commands/${folders[i]}/`, (error, files) => {
      if (error) {
        return console.error(error);
      }
      files.forEach((file) => {
        if (!file.endsWith('.js')) {
          return;
        }
        const props = require(`./commands/${folders[i]}/${file}`);
        const commandName = file.split('.')[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
      });
    });
  }
});

// Intializing the Settings Enmap
client.settings = new Enmap({
  name: 'settings',
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
});

// Setting up default configurations
const defaultSettings = {
  prefix: '.',
  modrole: 'Moderator',
  faction1: 'Mario',
  faction2: 'Luigi',
  faction1Role: 'faction1Role',
  faction2Role: 'faction2Role',
};

client.defaultSettings = defaultSettings;

// Intializng the 1-Up Enmap
client.oneups = new Enmap({ name: 'oneups' });

// Setting the blacklist
client.blacklisted = new Enmap({ name: 'blacklist' });

// Initializing the Items Enmap
client.userItems = new Enmap({ name: 'items' });

// Initializing the current poll Enmap
client.pollResults = new Enmap({ name: 'pollResults' });

// Handling errors
client.on('error', console.error);

// Logging into the client with the token hidden in config.json
client.login(config.token);
