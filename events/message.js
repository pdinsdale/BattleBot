module.exports = (client, message) => {

    // Send a messsage to the user's DM if the client detects a message from there
    if (message.channel.type === "dm") return message.author.send('I do **NOT** respond to commands in DMs! Please go to <#355186664869724161> in 1-Up World to use my commands!').catch(console.error);

    // Ignore all bots
    if (message.author.bot) return;

     // Objects and Messages and Stuff

    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};