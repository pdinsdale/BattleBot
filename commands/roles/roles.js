module.exports = {
  name: 'roles',
  description: 'Displays the current amount of users that have each color role',
  aliases: ['role'],
  usage: ' ',
  modonly: true,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Getting size of the roles
    const roleID1 = client.roleFind(message, 'Mario Fan').id;
    const memWF1 = client.roleGet(message, roleID1).members.size;

    const roleID2 = client.roleFind(message, 'Luigi Fan').id;
    const memWF2 = client.roleGet(message, roleID2).members.size;

    const roleID3 = client.roleFind(message, 'Yoshi Fan').id;
    const memWF3 = client.roleGet(message, roleID3).members.size;

    const roleID4 = client.roleFind(message, 'Peach Fan').id;
    const memWF4 = client.roleGet(message, roleID4).members.size;

    const roleID5 = client.roleFind(message, 'Bowser Fan').id;
    const memWF5 = client.roleGet(message, roleID5).members.size;

    const roleID6 = client.roleFind(message, 'Wario Fan').id;
    const memWF6 = client.roleGet(message, roleID6).members.size;

    const roleID7 = client.roleFind(message, 'Toad Fan').id;
    const memWF7 = client.roleGet(message, roleID7).members.size;

    // Displaying the message
    message.channel.send(`**Mario:** \n\`${memWF1} members\`\n\n**Luigi:** \n\`${memWF2} members\`\n\n**Yoshi:** \n\`${memWF3} members\`\n\n**Peach:** \n\`${memWF4} members\`\n\n**Bowser:** \n\`${memWF5} members\`\n\n**Wario:** \n\`${memWF6} members\`\n\n**Toad:** \n\`${memWF7} members\`\n`);
  },
};
