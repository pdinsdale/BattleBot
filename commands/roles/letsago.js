// eslint-disable-next-line no-unused-vars
module.exports.run = (client, message, args, level) => {
  // Sets the verified role
  const role = client.getSettings(message.guild).verifiedRole;

  // If member has the role, do this
  if (message.member.roles.has(role.id)) {
    message.error("You've Already Been Verified!", "Why use this command again? Don't be telling people it now/. That's not the point of why it's in the rules. They've got to go find it themselves!");
    message.delete().catch(console.error);
  } else {
    // If not, give it to em
    message.member.addRole(role).then(() => {
      message.channel.send(`${message.author} has been verified!`);
      message.delete().catch(console.error);
    }).catch(console.error);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['letago', 'letsgo'],
  permLevel: 'User',
};

module.exports.help = {
  name: 'letsago',
  category: 'roles',
  description: 'Verifies a member',
  usage: 'letsago',
};
