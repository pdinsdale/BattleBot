module.exports = { name: 'setnickname', aliases: ['setname', 'setusername'], async run(client, message, args) {

    // No mod? Good riddance
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    // Gets client's user and sets nickname to args[0] and displays the message
    message.guild.members.get(client.user.id).setNickname(`${args[0]}`);
    message.channel.send(`Successfully changed my nickname to ${args[0]}`);

}};