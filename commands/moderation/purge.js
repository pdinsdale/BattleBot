module.exports = {
  name: 'purge',
  description: 'Purges the stated number of messages in a channel or from a mentioned user',
  usage: '[Number 2-100] [@User]',
  args: '[Number 2-100] => Any number between 2 and 100. This will be the amount of messages purged. If used alone, will purge messages in a channel from all users \n[@User] => A valid member of the server. Will purge the stated amount of messages from this user.',
  modonly: true,
  async run(client, message, args) {
    // Gets the delete count
    const deleteCount = parseInt(args[0], 10);

    // If delete count is nonexistent, less than 2 or greater than 100, display this
    if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
      return message.reply('Please provide a number between 2 and 100 for the number of messages to delete');
    }

    // Gets and deletes the messages
    const fetched = await message.channel.fetchMessages({ limit: deleteCount });
    return message.channel.bulkDelete(fetched)
    // If purge fails, display this
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  },
};
