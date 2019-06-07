module.exports = {
  name: 'daisy',
  category: 'userRoles',
  description: 'Gives the author the role for Daisy',
  usage: ' ',
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Daisy Fan');

    client.fanRole(message, role, 'Daisy');
    message.delete().catch(err => console.log(err));
  },
};
