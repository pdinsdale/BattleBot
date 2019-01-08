module.exports = { name: 'command-name', async run(client, message, args) {

    if (message.author.id !== client.config.ownerID) return;
    
    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    let [such] = args;

    if (!args[0]) return message.reply(`Please specify what message counts to reset or use \`${client.config.prefix}reset all\` to reset all message counts!`);

    switch (such.toLowerCase()) {
        case 'all':
        client.userMessages.clear(`${message.guild.id}`);
        client.messages.clear(`${message.guild.id}`);
        message.channel.send('Successfully reset message counts for all users and factions!');
        break;
        case 'factions': case 'faction':
        client.messages.clear(`${message.guild.id}`);
        message.channel.send('Successfully reset message counts for both factions!');
        break;
        case 'users': case 'user':
        client.userMessages.clear(`${message.guild.id}`);
        message.channel.send('Successfully reset message counts for all users!');
        break;
        default:
        message.reply('Please specify which message counts to reset!');
        break;
    }
}};