module.exports = {
  name: 'yoshi',
  category: 'userRoles',
  description: 'Gives the author the role for Yoshi',
  usage: ' ',
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Yoshi Fan');

    client.fanRole(message, role, 'Yoshi');
    message.delete().catch(err => console.log(err));
  },
};
