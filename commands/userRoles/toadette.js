module.exports = {
  name: 'toadette',
  category: 'userRoles',
  description: 'Gives the author the role for Toadette',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Toadette Fan');

    client.fanRole(message, role, 'Toadette');
    message.delete().catch(err => console.log(err));
  },
};
