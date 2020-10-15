/* eslint-disable max-len */
/* eslint-disable consistent-return */

// Require necessary dependencies
const Discord = require('discord.js');
const eco = require('discordenvo');

// Collections for command cooldowns, point cooldowns, and level up delays
const cooldowns = new Discord.Collection();
const pointCooldowns = new Discord.Collection();
const memberLevelUpDelays = new Discord.Collection();

module.exports = async (client, message) => {
  // Ignore all bots
  if (message.author.bot) {
    return;
  }

  // If the message is in a guild but the member object is not cached, fetch the member object
  if (message.guild && !message.member) {
    await message.guild.members.fetch(message.author);
  }

  // Run the permLevel function to determine the user's permLevel
  // Then set the permLevel property of message.author to the returned permLevel
  const level = client.permLevel(message);
  // eslint-disable-next-line prefer-destructuring
  message.author.permLevel = level[1];

  // Ensure the blacklist for the guild exists
  const blacklist = client.blacklist.ensure(message.guild.id, []);

  // For each element in the blacklist
  for (const i in blacklist) { // eslint-disable-line no-restricted-syntax
    // If the message contains the blacklisted element
    if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) {
      // Delete the message
      message.delete();

      // Check if the member is kickable
      // If they are, kick them with the 'Spam Bot / Raider' reason
      // If not, error to the console
      if (!message.member.kickable) {
        console.error(`Unable to kick ${message.author.tag} because of missing permissions`);
      } else {
        message.member.kick('Spam Bot / Raider');
      }
    }
  }

  // Channels and categories ignored from ranking
  const protectedChannels = [
    '355186664869724161',
    '355139801676120074',
    '415992061955932160',
    '356505464944459778',
    '579354098566955028',
    '356505383700922370',
  ];
  // Ensure the user exists in the userDB
  const userFromDB = client.userDB.ensure(message.author.id, { points: 0, rank: message.member.roles.cache.has('391877990277185556') ? 1 : 0 });

  // If the message was NOT sent in a protected channel or the channel of a protected category
  if (!protectedChannels.includes(message.channel.id) && !protectedChannels.includes(message.channel.parentID)) {
    // If the user has a previous entry in the pointCooldowns collection and their cooldown expired, increment their points and reset their cooldown
    // If the user does not have a previous entry, increment their points and create them an entry
    if (pointCooldowns.has(message.author.id) ? (Date.now() - pointCooldowns.get(message.author.id)) > 120000 : true) {
      client.userDB.inc(message.author.id, 'points');
      pointCooldowns.set(message.author.id, Date.now());
    }

    // If the member does not have the highest role you can attain
    if (!message.member.roles.cache.has('754395863597711360')) {
      // Get role objects of each rank
      const shroomRole = message.guild.roles.cache.get('391877990277185556');
      const shellRole = message.guild.roles.cache.get('751118834206769293');
      const flowerRole = message.guild.roles.cache.get('751118889869377656');
      const leafRole = message.guild.roles.cache.get('751616251759165440');
      const bellRole = message.guild.roles.cache.get('754394768473194607');
      const featherRole = message.guild.roles.cache.get('751616457430925342');
      const eggRole = message.guild.roles.cache.get('754395250042208336');
      const starbitRole = message.guild.roles.cache.get('754395466598187148');
      const moonRole = message.guild.roles.cache.get('751616582307807323');
      const shineRole = message.guild.roles.cache.get('751616793092817038');
      const specialRole = message.guild.roles.cache.get('754395863597711360');
      // Pre-define leveledUp and newRank to be false and 0 respectively as a starting point
      let leveledUp = false;
      let newRank = 0;

      // Find the user's current rank to determine which value of points to look for
      switch (userFromDB.rank) {
        // If the user is currently rank 0
        case 0:
          // If the user has 15 or more points, give them the shroom role, increase their rank, and set leveledUp to true and newRank to 1
          if (userFromDB.points >= 15) {
            await message.member.roles.add(shroomRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 1;
          }
          break;
        // If the user is currently rank 1
        case 1:
          // If the user has 150 or more points, give them the shell role, remove the shroom role, increase their rank, and set leveledUp to true and newRank to 2
          if (userFromDB.points >= 150) {
            await message.member.roles.add(shellRole);
            await message.member.roles.remove(shroomRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 2;
          }
          break;
        // If the user is currently rank 2
        case 2:
          // If the user has 500 or more points, give them the flower role, remove the shell role, increase their rank, and set leveledUp to true and newRank to 3
          if (userFromDB.points >= 500) {
            await message.member.roles.add(flowerRole);
            await message.member.roles.remove(shellRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 3;
          }
          break;
        // If the user is currently rank 3
        case 3:
          // If the user has 1000 or more points, give them the leaf role, remove the flower role, increase their rank, and set leveledUp to true and newRank to 4
          if (userFromDB.points >= 1000) {
            await message.member.roles.add(leafRole);
            await message.member.roles.remove(flowerRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 4;
          }
          break;
        // If the user is currently rank 4
        case 4:
          // If the user has 2500 or more points, give them the bell role, remove the leaf role, increase their rank, and set leveledUp to true and newRank to 5
          if (userFromDB.points >= 2500) {
            await message.member.roles.add(bellRole);
            await message.member.roles.remove(leafRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 5;
          }
          break;
        // If the user is currently rank 5
        case 5:
          // If the user has 5000 or more points, give them the feather role, remove the bell role, increase their rank, and set leveledUp to true and newRank to 6
          if (userFromDB.points >= 5000) {
            await message.member.roles.add(featherRole);
            await message.member.roles.remove(bellRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 6;
          }
          break;
        // If the user is currently rank 6
        case 6:
          // If the user has 7500 or more points, give them the egg role, remove the feather role, increase their rank, and set leveledUp to true and newRank to 7
          if (userFromDB.points >= 7500) {
            await message.member.roles.add(eggRole);
            await message.member.roles.remove(featherRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 7;
          }
          break;
        // If the user is currently rank 7
        case 7:
          // If the user has 9999 or more points, give them the starbit role, remove the egg role, increase their rank, and set leveledUp to true and newRank to 8
          if (userFromDB.points >= 9999) {
            await message.member.roles.add(starbitRole);
            await message.member.roles.remove(eggRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 8;
          }
          break;
        // If the user is currently rank 8
        case 8:
          // If the user has 13000 or more points, give them the moon role, remove the starbit role, increase their rank, and set leveledUp to true and newRank to 9
          if (userFromDB.points >= 13000) {
            await message.member.roles.add(moonRole);
            await message.member.roles.remove(starbitRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 9;
          }
          break;
        // If the user is currently rank 9
        case 9:
          // If the user has 17000 or more points, give them the shine role, remove the moon role, increase their rank, and set leveledUp to true and newRank to 10
          if (userFromDB.points >= 17000) {
            await message.member.roles.add(shineRole);
            await message.member.roles.remove(moonRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 10;
          }
          break;
        // If the user is currently rank 10
        case 10:
          // If the user has 22000 or more points, give them the special role, remove the shine role, increase their rank, and set leveledUp to true and newRank to 11
          if (userFromDB.points >= 22000) {
            await message.member.roles.add(specialRole);
            await message.member.roles.remove(shineRole);
            client.userDB.inc(message.author.id, 'rank');
            leveledUp = true;
            newRank = 11;
          }
          break;
        default:
          // Do nothing as the user will never be anything other than the ranks above
      }

      // Ids of the emojis corresponding to each rank
      const levelUpEmojis = [
        '751523400681259110', // Shroom
        '751523400782053567', // Shell
        '751523400421474516', // Flower
        '751523400803024927', // Leaf
        '754054543238627389', // Bell
        '751523400173879486', // Feather
        '754044526166933654', // Egg
        '754129851245658112', // Starbit
        '751523400538783775', // Moon
        '754060026146193419', // Shine
        '754044526460665856', // Special
      ];

      // If the member is delayed a level up
      // (A level up can only be delayed if the user reached the required number of points in #serious-discussion)
      if (memberLevelUpDelays.has(message.author.id)) {
        // If the message is not in #serious-discussion
        // IE. the next message after a level up is outside #serious-discussion
        if (message.channel.id !== '687843926937305236') {
          // React to the message with the level up emoji and the emoji corresponding to the new rank of the member
          await message.react(client.emojis.cache.get('751623091200983050'));
          await message.react(client.emojis.cache.get(levelUpEmojis[memberLevelUpDelays.get(message.author.id) - 1]));
          // Delete the member's level up delay
          memberLevelUpDelays.delete(message.author.id);
        }
      } else if (leveledUp) {
        // If the member is not delayed a level up and they did in fact level up

        // If the channel the member leveled up in is #serious-discussion, delay the emoji reactions until the next message outside of #serious-discussion
        if (message.channel.id === '687843926937305236') {
          memberLevelUpDelays.set(message.author.id, newRank);
        } else {
          // If the message is not in #serious-discussion, react to the message with the level up emoji and the emoji corresponding to the new rank of the member
          await message.react(client.emojis.cache.get('751623091200983050'));
          await message.react(client.emojis.cache.get(levelUpEmojis[newRank - 1]));
        }
      }
    }
  }

  // If the message was not deleted
  // Useful for not performing operations on messages that are deleted but not yet recognized as such
  if (!message.deleted) {
    // Get the guild settings
    const settings = client.getSettings(message.guild);

    // Ignore messages not starting with the prefix
    if (message.content.indexOf(settings.prefix) !== 0) {
      return;
    }

    // Split the message into arguments to pull from in commands
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    // Get the command used
    const command = args.shift().toLowerCase();

    // Grab the command data and aliases from the client.commands Enmap
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    // Grab the enabledCmds object for the provided command
    const enabledCmds = client.enabledCmds.get(command) || client.enabledCmds.get(client.aliases.get(command));

    // If the command doesn't exist, silently exit and return
    if (!cmd) {
      return;
    }

    // Custom functions to make uniform success and error functions
    // Basically all they do is run message.channel.send with some special formatting
    message.success = (suc, msg) => {
      message.channel.send(`${client.emoji.checkMark} **${suc}**\n${msg}`);
    };
    message.error = (err, msg) => {
      message.channel.send(`${client.emoji.redX} **${err}**\n${msg}`);
    };

    // If the user's level is less than 2 (Mod), and the channel the command is used in is not #robotic-operating-buddy or #bot-testing, delete the message, direct the user to use #robotic-operating-buddy, then delete that message with a 10 second timeout
    // If the user is a mod or higher, this is bypassed
    if (level[1] < 2 && message.channel.id !== '355186664869724161' && message.channel.id !== '682337815031447597') {
      await message.delete().catch(console.error);
      return message.channel.send('Please use **all** bot commands in <#355186664869724161>!')
        .then((msg) => {
          msg.delete(10000).catch(console.error);
        });
    }

    // If the command provided is disabled
    if (enabledCmds.enabled === false) {
      // If the user's level is less than 2, error on command disabled
      // (Again, mods and higher bypass this)
      if (level[1] < 2) {
        return message.error('Command Disabled!', 'This command is currently disabled!');
      }
    }

    // If the command was not used in a guild and the command is only to be used in one, error on command not available in DMs
    if (!message.guild && cmd.conf.guildOnly) {
      return message.error('Command Not Available in DMs!', 'This command is unavailable in DMs. Please use it in a server!');
    }

    // If the user is less than the level required to run the provided command, error on invalid permissions and log to the console
    if (level[1] < client.levelCache[cmd.conf.permLevel]) {
      message.error('Invalid Permissions!', `You do not currently have the proper permssions to run this command!\n**Current Level:** \`${level[0]}: Level ${level[1]}\`\n**Level Required:** \`${cmd.conf.permLevel}: Level ${client.levelCache[cmd.conf.permLevel]}\``);
      return console.log(`**${message.author.tag}** *(${message.author.id})* tried to use cmd \`${cmd.help.name}\` without proper perms!`);
    }

    // If the provided command require arguments and the provided arguments are insufficient (command requires 2 argsuments but only 1 is provided), error on invalid arguments
    if (cmd.conf.args && (cmd.conf.args > args.length)) {
      return message.error('Invalid Arguments!', `The proper usage for this command is \`${settings.prefix}${cmd.help.usage}\`! For more information, please see the help command by using \`${settings.prefix}help ${cmd.help.name}\`!`);
    }

    // If this command doesn't have a cooldown entry, set one, using a collection as its value
    if (!cooldowns.has(cmd.help.name)) {
      cooldowns.set(cmd.help.name, new Discord.Collection());
    }

    // NOW, LIKE RIGHT NOW
    const now = Date.now();
    // Get the collection of timestamps from the command's cooldown entry
    const timestamps = cooldowns.get(cmd.help.name);
    // Find the cooldown time this command requires
    const cooldownAmount = (cmd.conf.cooldown || 0) * 1000;

    // If the member has used this command and is in its cooldown entry
    if (timestamps.has(message.author.id)) {
      // The timestamp of the cooldown + the cooldown amount
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      // If the cooldown has not expired yet
      if (now < expirationTime) {
        // Find the time left in the cooldown by subtracting now from the expiration time and dividing it by 1000 to get seconds
        let timeLeft = (expirationTime - now) / 1000;
        // Set time to seconds to be used in the error string
        let time = 'second(s)';
        // If the cooldown required is greater than 60 seconds
        if (cmd.conf.cooldown > 60) {
          // Find the time left in the cooldown by subtracting now from the expiration time and dividing it by 60000 to get minutes
          timeLeft = (expirationTime - now) / 60000;
          // Set time to minutes to be used in the error string
          time = 'minute(s)';
        }
        // Error on cooldown not expired
        return message.error('Woah There Bucko!', `Please wait **${timeLeft.toFixed(2)} more ${time}** before reusing the \`${cmd.help.name}\` command!`);
      }
    }

    // If the member is not in the command's cooldown entry, set them and the current timestamp
    timestamps.set(message.author.id, now);
    // Delete the member from the command's cooldown entry after the cooldown amount
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // message.flags = -flag
    // Basically better args
    message.flags = [];
    // While args[0] exists and the first character in args[0] = '-'
    while (args[0] && args[0][0] === '-') {
      // Push to the message.flags array the value of the flag
      // IE '-start' would be pushed as 'start'
      message.flags.push(args.shift().slice(1));
    }

    // Log the command run
    console.log(`**${message.author.tag}** *(${message.author.id})* ran cmd \`${cmd.help.name}\` in ${message.guild ? `**${message.guild.name}** *(${message.guild.id})*` : '**DMs**'}!`);
    // Run the command
    cmd.run(client, message, args, level[1], Discord, eco);
  }
};
