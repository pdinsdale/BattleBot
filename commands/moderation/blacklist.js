module.exports = { name: 'blacklist', aliases: ['bl'], async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    client.blacklisted.push(`${args[0]}`);
    console.log(`${message.member.user.tag} added ${args[0]} to the blacklist!\nBlacklist: ${client.blacklisted}`);
    message.channel.send(`Successfully added to the blacklist! Any member who uses this word/phrase/link will be automatically kicked!`);

}};