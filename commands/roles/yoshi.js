module.exports = {
  name: 'yoshi',
  category: 'userRoles',
  description: 'Gives the author the role for Yoshi',
  usage: ' ',
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1Y = client.roleFind(message, 'Mario Fan');
    const role2Y = client.roleFind(message, 'Luigi Fan');
    const role3Y = client.roleFind(message, 'Yoshi Fan');
    const role4Y = client.roleFind(message, 'Peach Fan');
    const role5Y = client.roleFind(message, 'Bowser Fan');
    const role6Y = client.roleFind(message, 'Wario Fan');
    const role7Y = client.roleFind(message, 'Toad Fan');

    client.remove(message, role1Y);
    client.remove(message, role2Y);
    client.remove(message, role4Y);
    client.remove(message, role5Y);
    client.remove(message, role6Y);
    client.remove(message, role7Y);

    // If they already have the faction role, display this
    if (message.member.roles.has(role3Y.id)) {
      message.reply('You already chose that character!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role3Y).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Yoshi**!`);
      message.delete().catch(err => console.log(err));
    }
  },
};