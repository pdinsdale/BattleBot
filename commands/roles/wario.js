module.exports = {
  name: 'wario',
  category: 'userRoles',
  description: 'Gives the author the role for Wario',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Wario Fan');

    client.fanRole(message, role, 'Wario');
    message.delete().catch(err => console.log(err));
  },
};
