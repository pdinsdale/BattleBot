module.exports = {
  name: "kick",
  description: "Kicks the mentioned user. Can be used with or without a stated reason",
  usage: "[@User] [reason]",
  args: "[@User] => A valid member of the server \n[reason] => Can be stated or left out of the message",
  modonly: true,
  async run(client, message, args) {
  
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