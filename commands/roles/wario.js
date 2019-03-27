module.exports = {
  name: 'wario',
  category: 'userRoles',
  description: 'Gives the author the role for Wario',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1W = client.roleFind(message, 'Mario Fan');
    const role2W = client.roleFind(message, 'Luigi Fan');
    const role3W = client.roleFind(message, 'Yoshi Fan');
    const role4W = client.roleFind(message, 'Peach Fan');
    const role5W = client.roleFind(message, 'Bowser Fan');
    const role6W = client.roleFind(message, 'Wario Fan');
    const role7W = client.roleFind(message, 'Toad Fan');

    client.remove(message, role1W);
    client.remove(message, role2W);
    client.remove(message, role3W);
    client.remove(message, role4W);
    client.remove(message, role5W);
    client.remove(message, role7W);

    // If they already have the faction role, display this
    if (message.member.roles.has(role6W.id)) {
      message.reply('You already chose that character!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role6W).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Wario**!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
