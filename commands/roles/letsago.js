// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  // Sets the verified role
  const settings = client.getSettings(message.guild);
  const role = message.guild.roles.find((r) => r.name === settings.verifiedRole);
  const generalCh = message.guild.channels.get('355119082808541185');

  // If member has the role, do this
  if (message.member.roles.has(role.id)) {
    message.delete().catch(console.error);
    const errMsg = await message.channel.send("You've already been verified!");
    setTimeout(() => errMsg.delete().catch(console.error), 5000);
  } else {
    // If not, give it to em
    message.member.addRole(role).then(async () => {
      message.delete().catch(console.error);
      const successMsg = await generalCh.send(`${message.author}, you've successfully verified! Welcome to the server!`);
      setTimeout(() => successMsg.delete().catch(console.error), 5000);
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
