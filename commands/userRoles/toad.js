module.exports = {
  name: 'toad',
  category: 'userRoles',
  description: 'Gives the author the role for Toad',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Toad Fan');

    client.fanRole(message, role, 'Toad');
    message.delete().catch(err => console.log(err));
  },
};
