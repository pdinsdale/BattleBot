module.exports = {
  name: 'spoilers',
  category: 'userRoles',
  description: 'Gives the author the Unspoiled role which hides #leaks-and-spoilers',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets the role to the Unspoiled role
    const role = client.roleFind(message, 'Unspoiled');
    const ch = message.guild.channels.find(c => c.name === 'leaks-and-spoilers');

    // If user has the role, remove it and display this message
    if (message.member.roles.has(role.id)) {
      message.member.removeRole(role).catch(err => console.log(err));
      message.reply("I've removed the **Unspoiled** role from you!");
      message.delete().catch(err => console.log(err));
    } else {
      // If not, give it to em
      message.member.addRole(role).catch(err => console.log(err));
      message.channel.send(`${message.author} has been given the **Unspoiled** role! You can no longer see <#${ch.id}>!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
