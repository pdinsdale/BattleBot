module.exports = {
  name: 'setnickname',
  category: 'system',
  description: 'Changes the nickname of BattleBot',
  aliases: ['setname', 'setusername'],
  usage: '[New nickname]',
  args: '[New nickname] => Can literally be anything',
  modonly: true,
  async run(client, message, args) {
    // Gets client's user and sets nickname to args[0] and displays the message
    if (!args[0]) {
      return message.reply('You need to provide something to change my nickname to!');
    }
    message.guild.members.get(client.user.id).setNickname(`${args.join(' ')}`);
    return message.channel.send(`Successfully changed my nickname to **${args.join(' ')}**!`);
  },
};
