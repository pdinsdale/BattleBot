module.exports = {
  name: 'fanpurge',
  category: 'roles',
  description: 'Removes the fan roles from all members',
  usage: ' ',
  modonly: true,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const role1 = client.roleFind(message, 'Mario Fan');
    const role2 = client.roleFind(message, 'Luigi Fan');
    const role3 = client.roleFind(message, 'Yoshi Fan');
    const role4 = client.roleFind(message, 'Peach Fan');
    const role5 = client.roleFind(message, 'Bowser Fan');
    const role6 = client.roleFind(message, 'Wario Fan');
    const role7 = client.roleFind(message, 'Toad Fan');

    await message.guild.members.forEach(async (m) => {
      await m.removeRole(role1);
      await m.removeRole(role2);
      await m.removeRole(role3);
      await m.removeRole(role4);
      await m.removeRole(role5);
      await m.removeRole(role6);
      await m.removeRole(role7);
    });

    return message.reply("Successfully removed all members' fan roles!");
  },
};
