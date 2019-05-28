module.exports = {
  name: 'arthelper',
  category: 'userRoles',
  description: 'Gives the author the Art Helper role which can be pinged for art help',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets the role to the Unspoiled role
    const role = client.roleFind(message, 'Art Helper');

    // If user has the role, remove it and display this message
    if (message.member.roles.has(role.id)) {
      message.member.removeRole(role).catch(err => console.log(err));
      message.reply("I've removed the **Art Helper** role from you!");
      message.delete().catch(err => console.log(err));
    } else {
      // If not, give it to em
      message.member.addRole(role).catch(err => console.log(err));
      message.channel.send(`${message.author} has been given the **Art Helper** role! They must be true masters!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
