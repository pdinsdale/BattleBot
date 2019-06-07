module.exports = {
  name: 'dk',
  category: 'userRoles',
  description: 'Gives the author the role for DK',
  usage: ' ',
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'DK Fan');

    client.fanRole(message, role, 'DK');
    message.delete().catch(err => console.log(err));
  },
};
