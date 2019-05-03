module.exports = {
  name: 'luigi',
  category: 'userRoles',
  description: 'Gives the author the role for Luigi',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Luigi Fan');

    client.fanRole(message, role, 'Luigi');
    message.delete().catch(err => console.log(err));
  },
};
