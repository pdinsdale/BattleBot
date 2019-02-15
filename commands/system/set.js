module.exports = { name: 'set', description: 'Sets the specified configuration', usage: '[configuration] [new setting]', args: '[configuration] => prefix, faction1, faction2, faction1Role, faction2Role, faction1Cmd, faction2Cmd \n[new setting] => Any string that you wish for the new setting to be', modonly: true, async run(client, message, args) {

    // Getting the key and value from args
    const [prop, ...value] = args;

    if (!prop) return message.reply('Please specify a proper key!');
    if (!args[1]) return message.reply('Please specify a proper value!')
     
    // Check if the key exists
    if(!client.settings.has(message.guild.id, prop)) return message.reply("This key is not in the configuration.");
    
    // Changing the value of the provided key
    client.settings.set(message.guild.id, value.join(" "), prop);
    
    // Sending a successful message
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
}};