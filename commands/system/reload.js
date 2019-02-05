module.exports = { name: 'reload', async run(client, message, args) {

    // MY COMMAND... Doesn't work and I'm too lazy to fix it
    if (message.author.id !== client.config.ownerID) return message.channel.send('Only the owner, Phoenix#0408, can use this command!');

    let [cmdFolder] = args[0];

    switch (cmdFolder.toLowerCase()) {
        case 'factions':
            try {
                delete require.cache[require.resolve(`./commands/factions/${args[1]}.js`)];
            } catch (e) {
                return message.channel.send(`Unable to reload: ${args[1]}`);
            } break;
        case 'fun':
            try {
                delete require.cache[require.resolve(`./commands/fun/${args[1]}.js`)];
            } catch (e) {
                return message.channel.send(`Unable to reload: ${args[1]}`);
            } break;
        case 'help':
            try {
                delete require.cache[require.resolve(`./commands/help/${args[1]}.js`)];
            } catch (e) {
                return message.channel.send(`Unable to reload: ${args[1]}`);
            } break;
        case 'info':
            try {
                delete require.cache[require.resolve(`./commands/info/${args[1]}.js`)];
            } catch (e) {
                return message.channel.send(`Unable to reload: ${args[1]}`);
            } break;
        case 'moderation':
            try {
                delete require.cache[require.resolve(`./commands/moderation/${args[1]}.js`)];
            } catch (e) {
                return message.channel.send(`Unable to reload: ${args[1]}`);
            } break;
        case 'system':
            try {
                delete require.cache[require.resolve(`./commands/system/${args[1]}.js`)];
            } catch (e) {
                return message.channel.send(`Unable to reload: ${args[1]}`);
            } break;
    }
}};