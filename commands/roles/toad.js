module.exports = {
  name: 'toad',
  description: 'Gives the author the role for Toad',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1T = client.roleFind(message, 'Mario Fan');
    const role2T = client.roleFind(message, 'Luigi Fan');
    const role3T = client.roleFind(message, 'Yoshi Fan');
    const role4T = client.roleFind(message, 'Peach Fan');
    const role5T = client.roleFind(message, 'Bowser Fan');
    const role6T = client.roleFind(message, 'Wario Fan');
    const role7T = client.roleFind(message, 'Toad Fan');

    client.remove(message, role1T);
    client.remove(message, role2T);
    client.remove(message, role3T);
    client.remove(message, role4T);
    client.remove(message, role5T);
    client.remove(message, role6T);

    // If they already have the faction role, display this
    if (message.member.roles.has(role7T.id)) {
      message.reply('You already chose that character!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role7T).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Toad**!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
