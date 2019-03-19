module.exports = {
  name: 'letsago',
  description: 'Gives the author the Verified role',
  aliases: ['letago', 'letsgo'],
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Currenty disabled
    if (message.author.id !== client.config.ownerID) {
      return;
    }

    // Sets the verified role
    const role = client.roleFind(message, 'Verified');

    // If member has the role, do this
    if (message.member.roles.has(role.id)) {
      message.reply("You've already been verified!");
      message.delete();
    } else {
      // If not, give it to em
      message.member.addRole(role).catch(console.error);
      message.channel.send(`${message.author} has been verfied!`);
      message.delete();
    }
  },
};
