module.exports = { name: 'mute', async run(client, message, args) {

    // No mod role, guess you can't use this
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("You don't have permissions to use this!");

  // Sets the role to the Brick Block role
  let role = message.guild.roles.find(r => r.name === "Brick Block");

  // Sets the member to the user mentioned
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  
   // If no user mentioned, display this
   if(!member) return message.reply("Please mention a valid member of this server");

   // Adds the role to the member and deletes the message that initiated the command
    member.addRole(role).catch(err => console.log(err));
    message.delete().catch(err => console.log(err));
    return;
}};