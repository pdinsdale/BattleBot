module.exports = {
  name: 'mute',
  description: 'Gives the mentioned user the Brick Block role',
  usage: '[@User]',
  args: '[@User] => A valid member of the server',
  modonly: true,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets the role to the Brick Block role
    const role = client.roleFind(message, 'Brick Block');

    // Sets the member to the user mentioned
    const member = message.mentions.members.first();

    // If no user mentioned, display this
    if (!member) {
      return message.reply('Please mention a valid member of this server');
    }

    // Adds the role to the member and deletes the message that initiated the command
    member.addRole(role).catch(err => console.log(err));
    return message.delete().catch(err => console.log(err));
  },
};
