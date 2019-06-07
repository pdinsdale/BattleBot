module.exports = {
  name: 'fans',
  category: 'roles',
  description: 'Displays the current amount of users that have each color role',
  aliases: ['fan'],
  usage: ' ',
  modonly: true,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Getting size of the roles
    const role1 = client.fanRoleFind(message, 'Mario');
    const role2 = client.fanRoleFind(message, 'Luigi');
    const role3 = client.fanRoleFind(message, 'Toad');
    const role4 = client.fanRoleFind(message, 'Toadette');
    const total = role1 + role2 + role3 + role4;

    // Displaying the message
    message.channel.send(`**Mario:** \n\`${role1} members\`\n\n**Luigi:** \n\`${role2} members\`\n\n**Toad:** \n\`${role3} members\`\n\n**Toadette:** \n\`${role4} members\`\n\n**Total:** \`${total} members\``);
  },
};
