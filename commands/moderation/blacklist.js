module.exports = {
    name: "blacklist",
    description: "Blacklists the given word/phrase/link. Any member who uses a blacklisted item will be automatically kicked",
    aliases: ["bl"],
    usage: "[Word/Phrase/Link]",
    args: "[Word/Phrase/Link] => Can literally be anything but most useful when used with links as spam bots tend to use them",
    modonly: true,
    async run(client, message, args) {

    // Pushes args[0] to the blacklist array, logs it, and sends this messsage
    client.blacklisted.push(`${args[0]}`);
    console.log(`${message.member.user.tag} added ${args[0]} to the blacklist!\nBlacklist: ${client.blacklisted}`);
    message.channel.send(`Successfully added to the blacklist! Any member who uses this word/phrase/link will be automatically kicked!`);
}};