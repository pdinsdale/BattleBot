module.exports = { name: 'setavatar', aliases: ['seticon', 'setpfp'], async run(client, message, args) {

    // No mod? Good don't touch this
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    // Sets image to the attachment
    let image = message.attachments.first().url;

    // Sets client's pfp
    client.user.setAvatar(image);

    // Sends success message
    message.channel.send('Successfully altered my avatar!');

}};