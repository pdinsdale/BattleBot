module.exports = { name: 'kick', async run(client, message, args) {

  // No mod role, sucks for you
  if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
  return message.reply("You don't have permissions to use this!");
  
  // Sets the member to the user mentioned
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);

  // If no user mentioned, display this
  if(!member)
    return message.reply("Please mention a valid member of this server");

  // If member can't be kicked, display this
  if(!member.kickable) 
    return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
  
  // Sets the reason shown in the audit logs
  let reason = args.slice(1).join(' ');
  if(!reason) reason = "No reason provided";
  
  // Kicks the mentioned user
  await member.kick(reason)
    // If kick unsuccessful, display this
    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    // If kick successful, display this
  message.reply(`${member.user.tag} (${member.user.id}) has been kicked by ${message.author.displayName} because: ${reason}`);
}};