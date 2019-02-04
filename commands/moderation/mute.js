module.exports = { name: 'mute', async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
      return message.reply("You don't have permissions to use this!");

  let role = message.guild.roles.find(r => r.name === "Brick Block");

  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  
   if(!member) return message.reply("Please mention a valid member of this server");

    member.addRole(role).catch(err => console.log(err));
    message.delete().catch(err => console.log(err));
    return;
}};