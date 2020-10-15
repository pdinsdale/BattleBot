// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
//   const num0 = parseInt(args[0], 10);
//   const num1 = parseInt(args[1], 10);
  let msg = '';
  //   const userDBSize = client.userDB.count - 1;

  // Get the user from the userDB Enmap and fetch the member object
  const user = client.userDB.get(args[0]);
  const member = await message.guild.members.fetch(args[0]);

  // If the member object or the user object was not found, error on user not found
  if (!member || !user) {
    return message.error('No User Found!', "That user wasn't found in the database!");
  }

  // Concatenate the user's information and points and send the stats
  msg += `\n**${member.displayName}** (${args[0]}) - ${user.points} points -  Rank ${user.rank}`;
  return message.channel.send(`**Ranked Statistics**\nName - Points - Rank${msg}`, { split: true });

  // ALL THE BELOW CODE IS AN IDEA TO EXPAND UPON THE POINTS COMMAND
  // IT DOES NOT NECESSARILY HAVE TO BE USED (would need to be converted)
  // (was taken from Nookbot's sheetstats command)

  //   switch (args[0]) {
  //     case 't':
  //     case 'top': {
  //       if (Number.isNaN(num1) || num1 <= 0) {
  //         return message.error('Not a Number!', 'You must supply a number for the amount of top ranked users to display.');
  //       }

  //       const mods = client.userDB.map((v, k) => ({ id: k, points: v.points }))
  //         .sort((a, b) => b.points - a.points)
  //         .slice(0, num1);

  //       await client.asyncForEach(mods, async (e, i) => {
  //         if (e.id !== 'data') {
  //           const mod = await message.guild.members.fetch(e.id) || 'Unknown Mod';
  //           msg += `\n#${i + 1} - **${mod.displayName}** (${e.id}) - ${e.hours} hours`;
  //         }
  //       });

  //       if (!msg) {
  //         return client.error(message.channel, 'No Matches!', 'No mods matched your search critera!');
  //       }
  //       return message.channel.send(`**Sign Up Sheet Statistics**\nRank - Name - Hours${msg}`, { split: true });
  //     }
  //     case 'b':
  //     case 'bottom': {
  //       if (Number.isNaN(num1) || num1 <= 0) {
  //         return client.error(message.channel, 'Not a Number!', 'You must supply a number for the amount of bottom ranked mods to display.');
  //       }

  //       const mods = client.reactionSignUp.map((v, k) => ({ id: k, hours: v.hoursThisWeek }))
  //         .sort((a, b) => b.hours - a.hours)
  //         .slice(-num1);

  //       await client.asyncForEach(mods, async (e, i) => {
  //         if (e.id !== 'data') {
  //           const mod = await message.guild.members.fetch(e.id);
  //           msg += `\n#${sheetDBSize - num1 + i + 1} - **${mod.displayName}** (${e.id}) - ${e.hours} hours`;
  //         }
  //       });

  //       if (!msg) {
  //         return client.error(message.channel, 'No Matches!', 'No mods matched your search critera!');
  //       }
  //       return message.channel.send(`**Sign Up Sheet Statistics**\nRank - Name - Hours${msg}`, { split: true });
  //     }
  //     default: {
  //       if (args.length === 2 && Number.isInteger(num0) && Number.isInteger(num1)) {
  //         if (num0 <= 0 || num1 <= 0) {
  //           return client.error(message.channel, 'Invalid Numbers!', 'The numbers provided must be greater than 0.');
  //         }

  //         if (num1 > num0) {
  //           const temp = num0;
  //           num0 = num1;
  //           num1 = temp;
  //         }

  //         const mods = client.reactionSignUp.map((v, k) => ({ id: k, hours: v.hoursThisWeek }))
  //           .sort((a, b) => b.hours - a.hours)
  //           .slice(num1 - 1, num0);

  //         await client.asyncForEach(mods, async (e, i) => {
  //           if (e.id !== 'data') {
  //             const mod = await message.guild.members.fetch(e.id) || 'Unknown Mod';
  //             msg += `\n#${num1 + i} - **${mod.displayName}** (${e.id}) - ${e.hours} hours`;
  //           }
  //         });

  //         if (!msg) {
  //           return client.error(message.channel, 'No Matches!', 'No mods matched your search critera!');
  //         }
  //         return message.channel.send(`**Sign Up Sheet Statistics**\nRank - Name - Hours${msg}`, { split: true });
  //       }

  //       if (args.length === 0) {
  //         const mod = client.reactionSignUp.get(message.member.id);
  //         // Try to send DM
  //         try {
  //           const dmChannel = await message.member.createDM();

  //           if (!mod) {
  //             return client.error(dmChannel, 'No Mod Found!', 'You were not found in the database!');
  //           }

  //           await dmChannel.send(`**Sign Up Sheet Statistics**\nName - Hours\n**${message.member.displayName}** (${message.member.id}) - ${mod.hoursThisWeek} hours`);
  //           return client.success(message.channel, 'Hours Sent!', "I've successfully sent you your current hours for the week!");
  //         } catch (e) {
  //           return client.error(message.channel, 'Failed to DM Hours!', "I've failed to DM your hours! Please esnure you have your DMs open!");
  //         }
  //       } else {
  //         const mod = client.reactionSignUp.get(args[0]);
  //         const member = await message.guild.members.fetch(args[0]);

  //         if (!member || !mod) {
  //           return client.error(message.channel, 'No Mod Found!', "That mod wasn't found in the database!");
  //         }

  //         const mods = client.reactionSignUp.map((v, k) => ({ id: k, hours: v.hoursThisWeek }))
  //           .sort((a, b) => b.hours - a.hours);

  //         msg += `\n#${(mods.findIndex((s) => s.id === args[0]))} - **${member.displayName}** (${args[0]}) - ${mod.hoursThisWeek} hours`;
  //         return message.channel.send(`**Sign Up Sheet Statistics**\nRank - Name - Hours${msg}`, { split: true });
  //       }
//     }
//   }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['rank', 'po', 'pt', 'rk'],
  permLevel: 'Mod',
  args: 1,
};

module.exports.help = {
  name: 'points',
  category: 'misc',
  description: 'Gives ranking info on users',
  usage: 'points <id>',
  details: '<id> => The id of the user to display points for',
};
