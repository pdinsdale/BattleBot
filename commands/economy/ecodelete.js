module.exports = {
  name: 'ecodelete',
  description: 'Deletes the specified user from the economy database',
  aliases: ['ecod', 'ed'],
  usage: '[@User]',
  args: '[@User] => Any valid member of the server you wish to be deleted from the economy database',
  cooldown: 10,
  async run(client, message, args, Discord, eco) {
    const user = message.mentions.users.first();

    const output = await eco.Delete(user.id);

    if (output.deleted === true) {
      return message.reply(`Succesfully deleted **${user.tag}** from the economy database!`);
    }

    return message.reply('**Error**: Could not find that user in the economy database!');
  },
};
