module.exports = {
  name: 'letsago',
  category: 'userRoles',
  description: 'Gives the author the Verified role',
  aliases: ['letago', 'letsgo'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets the verified role
    const role = client.roleFind(message, 'Verified');

    // If member has the role, do this
    if (message.member.roles.has(role.id)) {
      message.reply("You've already been verified!");
      message.delete().catch(err => console.log(err));
    } else {
      // If not, give it to em
      message.member.addRole(role).catch(console.error).catch(err => console.log(err));
      message.channel.send(`${message.author} has been verified!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
