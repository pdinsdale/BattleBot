module.exports = {
  name: 'luigi',
  category: 'userRoles',
  description: 'Gives the author the role for Luigi',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1L = client.roleFind(message, 'Mario Fan');
    const role2L = client.roleFind(message, 'Luigi Fan');
    const role3L = client.roleFind(message, 'Yoshi Fan');
    const role4L = client.roleFind(message, 'Peach Fan');
    const role5L = client.roleFind(message, 'Bowser Fan');
    const role6L = client.roleFind(message, 'Wario Fan');
    const role7L = client.roleFind(message, 'Toad Fan');

    client.remove(message, role1L);
    client.remove(message, role3L);
    client.remove(message, role4L);
    client.remove(message, role5L);
    client.remove(message, role6L);
    client.remove(message, role7L);

    // If they already have the faction role, display this
    if (message.member.roles.has(role2L.id)) {
      message.reply('You already chose that character!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role2L).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Luigi**!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
