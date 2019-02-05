module.exports = { name: 'purge', async run(client, message, args) {

    // No mod role = no usage
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
  return message.reply("You don't have permissions to use this!");
  
  // Gets the delete count
  const deleteCount = parseInt(args[0], 10);
  
  // If delete count is nonexistent, less than 2 or greater than 100, display this
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
  
  // Gets and deletes the messages
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    // If purge fails, display this
    .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
}};