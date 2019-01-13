module.exports = { name: 'command-name', async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    message.guild.members.get(client.user.id).setNickname(`${args[0]}`);
    message.channel.send(`Successfully changed my nickname to ${args[0]}`);

}};