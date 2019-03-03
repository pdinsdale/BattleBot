
// Bot Version 1.1.3

// Standard importing modules and crap
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

// Defining client and config
const client = new Discord.Client();
const config = require("./config.json");

// Attaching the client to the config file so it can be used anywhere
client.config = config;

// Attaching the bot version to the client so it can be used anywhere
const version = "v1.1.3";
client.version = version;

// Reading and doing stuff to make events work
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
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
      if (!file.endsWith(".js")) {
        return;
      }
      let props = require(`./commands/${(category)}/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });
}

// Reading and doing stuff to make commands work
commandsProps("fun");
commandsProps("help");
commandsProps("info");
commandsProps("moderation");
commandsProps("system");
commandsProps("factions");
commandsProps("roles");
commandsProps("economy");

// Intializing the Settings Enmap
client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep"
});

// Setting up default configurations
const defaultSettings = {
  prefix: ".",
  modrole: "Moderator",
  faction1: "Mario",
  faction2: "Luigi",
  faction1Role: "faction1Role",
  faction2Role: "faction2Role",
  faction1Cmd: "faction1Cmd",
  faction2Cmd: "faction2Cmd"
};

client.defaultSettings = defaultSettings;

// Intializng the 1-Up Enmap
client.oneups = new Enmap({name: "oneups"});

// Setting the blacklist                                     Link that crashes Discord clients used by the raiders Oakbrook Phil and Homer Simpson Gaming
let blacklisted = ["http://discord.amazingsexdating.com/", "https://open.spotify.com/track/5HjEC3NlSzKsVKmqnhXrum?context=spotify%3Auser%%3Aplaylist%3A4PTJQnhzs5mo4wrKlTMlS4&si=RzHko2lIQMCSPDp0jubksghttps://open.spotify.com/track/5HjEC3NlSzKsVKmqnhXrum?context=spotify%3Auser%%3Aplaylist%3A4PTJQnhzs5mo4wrKlTMl"];
client.blacklisted = blacklisted;

// Logging into the client with the token hidden in config.json
client.login(config.token);