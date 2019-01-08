module.exports = { name: 'command-name', async run(client, message, args) {

  if(message.member.user.id !== client.config.ownerID) return;

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");
  
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server");
  if(!member.bannable) 
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason provided";
  
  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
  message.reply(`${member.user.tag} has been banned by ${message.author.displayName} because: ${reason}`);
}};