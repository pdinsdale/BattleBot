/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Bot Version 1.1.3

// Standard importing modules and crap
const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');

// Calendar stuff
const Calendar = require('node-google-calendar');
const calConfig = require('./src/settings');

const cal = new Calendar(calConfig);

// Defining client and config
const client = new Discord.Client();
const config = require('./config.json');
require('./src/functions.js')(client);

// Attaching the client to the config file and calendar so they can be used anywhere
client.config = config;
client.cal = cal;
client.calConfig = calConfig;

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

// Creating the fs function
function commandsProps(category) {
  fs.readdir(`./commands/${(category)}/`, (err, files) => {
    if (err) {
      return console.error(err);
    }
    files.forEach((file) => {
      if (!file.endsWith('.js')) {
        return;
      }
      const props = require(`./commands/${(category)}/${file}`);
      const commandName = file.split('.')[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });
}

// Reading and doing stuff to make commands work
commandsProps('fun');
commandsProps('help');
commandsProps('info');
commandsProps('moderation');
commandsProps('system');
commandsProps('factions');
commandsProps('roles');
commandsProps('economy');
commandsProps('misc');
commandsProps('calendar');

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

// Logging into the client with the token hidden in config.json
client.login(config.token);
