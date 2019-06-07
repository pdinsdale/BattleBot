module.exports = {
  name: 'bowser',
  category: 'userRoles',
  description: 'Gives the author the role for Bowser',
  usage: ' ',
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    const role = client.roleFind(message, 'Bowser Fan');

    client.fanRole(message, role, 'Bowser');
    message.delete().catch(err => console.log(err));
  },
};
