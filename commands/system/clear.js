/* eslint-disable consistent-return */

// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  switch (message.flags[0]) {
    case '1ups': case '1up': {
    // Sends a message that awaits an emoji response
      const msgClear = await message.channel.send("Are you sure you want to clear the database of both factions' 1-Ups?");

      // Sets both emojis
      const emoji1 = client.emoji.thumbsupio;
      const emoji2 = client.emoji.luigipain;

      // Reacts to the message
      msgClear.react(emoji1).then(() => msgClear.react(emoji2));

      // Filters the reactions so only the command user can return the promise
      // eslint-disable-next-line max-len
      const filter = (reaction, user) => [emoji1, emoji2].includes(reaction.emoji.id) && user.id === message.author.id;

      // Sets up the listener
      msgClear.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then((collected) => {
          const reaction = collected.first();

          if (reaction.emoji.id === emoji1) {
            // Sets each faction's 1-ups to 0, displays a message, and logs it to the console
            client.oneups.set(message.guild.id, 0, 'faction1ups');
            client.oneups.set(message.guild.id, 0, 'faction2ups');
            message.success('Successfully Cleared the 1-Up Database!', 'No 1-Ups are in my system! Wahoo!');
            console.log(`${message.member.user.tag} cleared the 1-Up enmap`);
          } else {
          // If answer = no, display this
            return message.reply('Ok I see you thought twice about it. No changes have been made!');
          }
        })
        .catch(() => {
        // If time expires, log it to the console and display a message
          console.log('After a minute, no one decided to clear the 1-Up enmap');
          return message.error('Time Expired!', "So... I guess we're not resetting the database today... All good, no changes have been made!");
        });
      break;
    }
    default:
      message.error('Invalid Flag!', `Remember to use flags when using this command! For example: \`-1ups\`! For further details, use \`${client.getSettings(message.guild).prefix}help clear\`!`);
      break;
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['reset'],
  permLevel: 'Mod',
  args: 1,
};

module.exports.help = {
  name: 'clear',
  category: 'system',
  description: 'Clears the specified database',
  usage: 'clear <-1ups>',
  details: "<-1ups> => Clears the 1ups database. (Notice the - it's important!)",
};
