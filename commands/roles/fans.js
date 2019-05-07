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
    const role3 = client.fanRoleFind(message, 'Yoshi');
    const role4 = client.fanRoleFind(message, 'Peach');
    const role5 = client.fanRoleFind(message, 'Bowser');
    const role6 = client.fanRoleFind(message, 'Wario');
    const role7 = client.fanRoleFind(message, 'Toad');
    const role8 = client.fanRoleFind(message, 'Daisy');
    const role9 = client.fanRoleFind(message, 'DK');
    const role10 = client.fanRoleFind(message, 'Waluigi');

    // Displaying the message
    message.channel.send(`**Mario:** \n\`${role1} members\`\n\n**Luigi:** \n\`${role2} members\`\n\n**Yoshi:** \n\`${role3} members\`\n\n**Peach:** \n\`${role4} members\`\n\n**Bowser:** \n\`${role5} members\`\n\n**Wario:** \n\`${role6} members\`\n\n**Toad:** \n\`${role7} members\`\n\n**Daisy:** \n\`${role8} members\`\n\n**DK:** \n\`${role9} members\`\n\n**Waluigi:** \n\`${role10} members\`\n`);
  },
};
