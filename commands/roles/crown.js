module.exports = { name: 'crown', async run(client, message, args) {

    // No mod role = you can't use it
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    // Setting the crown role
    let crown = message.guild.roles.find(role => role.name === "Crown");

    // Setting the member to the user mentioned
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  
    // If no user mentioned, display this message
    if(!member) return message.reply("Please mention a valid member of this server to give the Crown role to!");

    // Add role, if fails log and display the message
    member.addRole(crown).catch(err => {
        message.reply('Something went wrong...')
        console.log(err);
    });
    // Displays the success message
    message.channel.send(`Successfully applied the Crown role to ${member}!`);
}};