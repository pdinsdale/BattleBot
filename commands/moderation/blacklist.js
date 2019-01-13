module.exports = { name: 'command-name', async run(client, message, args) {

    client.blacklisted.push(`${args[0]}`);
    console.log(`${message.member.user.tag} added ${args[0]} to the blacklist!\nBlacklist: ${client.blacklisted}`);
    message.channel.send(`Successfully added to the blacklist! Any member who uses this word/phrase/link will be automatically kicked!`);

}};