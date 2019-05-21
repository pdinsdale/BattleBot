module.exports = {
  name: 'peach',
  category: 'userRoles',
  description: 'Gives the author the role for Peach',
  usage: ' ',
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Peach Fan');

    client.fanRole(message, role, 'Peach');
    message.delete().catch(err => console.log(err));
  },
};
