module.exports = {
  name: 'waluigi',
  category: 'userRoles',
  description: 'Gives the author the role for Waluigi',
  usage: ' ',
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Waluigi Fan');

    client.fanRole(message, role, 'Waluigi');
    message.delete().catch(err => console.log(err));
  },
};
