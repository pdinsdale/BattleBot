module.exports = { name: 'setnickname', description: 'Changes the nickname of BattleBot', aliases: ['setname', 'setusername'], usage: '[New nickname]', args: '[New nickname] => Can literally be anything', modonly: true, async run(client, message, args) {

    // Gets client's user and sets nickname to args[0] and displays the message
    message.guild.members.get(client.user.id).setNickname(`${args.join(' ')}`);
    message.channel.send(`Successfully changed my nickname to ${args.join(' ')}`);
}};