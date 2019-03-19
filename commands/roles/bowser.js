module.exports = {
  name: 'bowser',
  description: 'Gives the author the role for Bowser',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1B = client.roleFind(message, 'Mario Fan');
    const role2B = client.roleFind(message, 'Luigi Fan');
    const role3B = client.roleFind(message, 'Yoshi Fan');
    const role4B = client.roleFind(message, 'Peach Fan');
    const role5B = client.roleFind(message, 'Bowser Fan');
    const role6B = client.roleFind(message, 'Wario Fan');
    const role7B = client.roleFind(message, 'Toad Fan');

    client.remove(message, role1B);
    client.remove(message, role2B);
    client.remove(message, role3B);
    client.remove(message, role4B);
    client.remove(message, role6B);
    client.remove(message, role7B);

    // If they already have the faction role, display this
    if (message.member.roles.has(role5B.id)) {
      message.reply('You already chose that character!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role5B).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Bowser**!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
