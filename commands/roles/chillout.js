// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  const role = message.guild.roles.get('687833693863149578');

  // If member has the role, do this
  if (message.member.roles.has(role.id)) {
    message.member.removeRole(role).then(() => {
      message.success('Success!', `${message.author}, I've successfully removed the **${role.name}** role from you!`);
      message.delete().catch(console.error);
    }).catch(console.error);
  } else {
    // If not, give it to em
    message.member.addRole(role).then(async () => {
      message.success('Success!', `${message.author}, I've successfully added the **${role.name}** role! You can no longer see #serious-discussion!`);
      message.delete().catch(console.error);
    }).catch(console.error);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

module.exports.help = {
  name: 'chillout',
  category: 'roles',
  description: 'Gives the member the Chilled Out role',
  usage: 'chilout',
};
