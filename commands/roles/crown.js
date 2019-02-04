module.exports = { name: 'crown', async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    let crown = message.guild.roles.find(role => role.name === "Crown");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  
    if(!member) return message.reply("Please mention a valid member of this server to give the Crown role to!");

    member.addRole(crown).catch(err => {
        message.reply('Something went wrong...')
        console.log(err);
    });
    message.channel.send(`Successfully applied the Crown role to ${member}!`);
}};