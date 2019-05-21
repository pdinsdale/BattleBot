module.exports = {
  name: 'mario',
  category: 'userRoles',
  description: 'Gives the author the role for Mario',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Mario Fan');

    client.fanRole(message, role, 'Mario');
    message.delete().catch(err => console.log(err));
  },
};
