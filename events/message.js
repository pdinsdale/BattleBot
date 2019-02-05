module.exports = (client, message) => {

    // Send a messsage to the user's DM if the client detects a message from there
    if (message.channel.type === "dm") return message.author.send('I do **NOT** respond to commands in DMs! Please go to <#355186664869724161> in 1-Up World to use my commands!').catch(console.error);

    // Ignore all bots
    if (message.author.bot) return;

    // Blacklist so no stupid spam bot can wreak havoc on 1-Up World
    let foundInText = false;
    for (var i in client.blacklisted) {
        if (message.content.toLowerCase().includes(client.blacklisted[i].toLowerCase())) foundInText = true;
    }

    if (foundInText) {
        message.delete();
        message.member.kick("Spam bot");
    }

    // When bot is mentioned, display this message
    if (message.isMentioned(client.user)) {
        if (message.channel.id === '355186664869724161') {
            message.channel.send(`Hey ${message.author}! I'm ${client.user}, a bot made by <@${client.config.ownerID}> for the 1-Up World Discord server! I mainly handle Faction Battle stuff along with distributing roles but I've got other fun commands! Use \`.help\` to see a full list! Remember to ping or DM Phoenix with any questions, comments, or feedback!`);
        } else return;
    }

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};