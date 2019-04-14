module.exports = {
  name: 'peach',
  category: 'userRoles',
  description: 'Gives the author the role for Peach',
  usage: ' ',
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1P = client.roleFind(message, 'Mario Fan');
    const role2P = client.roleFind(message, 'Luigi Fan');
    const role3P = client.roleFind(message, 'Yoshi Fan');
    const role4P = client.roleFind(message, 'Peach Fan');
    const role5P = client.roleFind(message, 'Bowser Fan');
    const role6P = client.roleFind(message, 'Wario Fan');
    const role7P = client.roleFind(message, 'Toad Fan');

    client.remove(message, role1P);
    client.remove(message, role2P);
    client.remove(message, role3P);
    client.remove(message, role5P);
    client.remove(message, role6P);
    client.remove(message, role7P);

    // If they already have the faction role, display this
    if (message.member.roles.has(role4P.id)) {
      message.reply('You already chose that character!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role4P).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Peach**!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
