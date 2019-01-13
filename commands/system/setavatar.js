module.exports = { name: 'command-name', async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    let image = message.attachments.first().url;

    client.user.setAvatar(image);

    message.channel.send('Successfully altered my avatar!');

}};