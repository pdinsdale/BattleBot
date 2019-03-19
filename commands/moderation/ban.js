module.exports = {
  name: 'ban',
  description: 'Bans the mentioned user. Can be used with or without a stated reason',
  usage: '[@User] [reason]',
  args: '[@User] => A valid member of the server \n[reason] => Can be stated or left out of the message',
  modonly: true,
  async run(client, message, args) {
    // Setting member to first user memntioned
    const member = message.mentions.members.first();

    // If no member mentioned, display this message
    if (!member) {
      return message.reply('Please mention a valid member of this server');
    }

    // If member can't be banned, display this
    if (!member.bannable) {
      return message.reply('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');
    }

    // Sets reason shown in audit logs
    let reason = args.slice(1).join(' ');

    if (!reason) {
      reason = 'No reason provided';
    }

    // Bans the member
    await member.ban(reason)
    // If ban fails, display this
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    // If ban is successful, display this
    return message.reply(`${member.user.tag} has been banned by ${message.author.displayName} because: ${reason}`);
  },
};
