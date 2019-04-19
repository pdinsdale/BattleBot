module.exports = {
  name: 'smashbros',
  category: 'userRoles',
  description: "Gives the author the Frequent Fighter role which can be pinged if you're looking for an SSBU game",
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets the role to the frequent fighter role
    const role = client.roleFind(message, 'Frequent Fighter');

    // If user has the role, remove it and display this message
    if (message.member.roles.has(role.id)) {
      message.member.removeRole(role).catch(err => console.log(err));
      message.reply("I've removed the **Frequent Fighter** role from you! You will no longer be pinged for future matches!");
      message.delete().catch(err => console.log(err));
    } else {
      // If not, give it to em
      message.member.addRole(role).catch(err => console.log(err));
      message.channel.send(`${message.author} has been given the **Frequent Fighter** role! Good luck in your future matches against your fellow fighters!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
