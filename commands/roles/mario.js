module.exports = {
  name: 'mario',
  description: 'Gives the author the role for Mario',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1M = client.roleFind(message, 'Mario Fan');
    const role2M = client.roleFind(message, 'Luigi Fan');
    const role3M = client.roleFind(message, 'Yoshi Fan');
    const role4M = client.roleFind(message, 'Peach Fan');
    const role5M = client.roleFind(message, 'Bowser Fan');
    const role6M = client.roleFind(message, 'Wario Fan');
    const role7M = client.roleFind(message, 'Toad Fan');

    client.remove(message, role2M);
    client.remove(message, role3M);
    client.remove(message, role4M);
    client.remove(message, role5M);
    client.remove(message, role6M);
    client.remove(message, role7M);

    // If they already have the faction role, display this
    if (message.member.roles.has(role1M.id)) {
      message.reply('You already chose that character!');
    } else {
      // If not give it to em. If fails, display this message which alerts me and logs to console
      message.member.addRole(role1M).catch((err) => {
        message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
        console.log(err);
      });
      // Sends the success message and deletes the original message to keep chat less clutered
      message.channel.send(`${message.author} has joined **Mario**!`);
      message.delete().catch(err => console.log(err));
    }
  },
};
