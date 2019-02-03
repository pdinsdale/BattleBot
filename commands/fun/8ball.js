module.exports = { name: 'command-name', aliases: ['8', 'predict'], async run(client, message, args) {

  if(!args[0]) return message.reply(`Proper Usage: \`${client.config.prefix}8ball [Question]\``);

    const randomNumber = Math.floor(Math.random() * 7);

      switch (randomNumber) {
          case 0:
            message.channel.send(`:8ball: | It is certain, **${message.member.displayName}**`);
            break;
          case 1:
            message.channel.send(`:8ball: | It is decidedly so, **${message.member.displayName}**`);
            break;
          case 2:
            message.channel.send(`:8ball: | Replay hazy... Try again, **${message.member.displayName}**`);
            break;
          case 3:
            message.channel.send(`:8ball: | Cannot predict now, **${message.member.displayName}**`);
            break;
          case 4:
            message.channel.send(`:8ball: | Don\'t count on it, **${message.member.displayName}**`);
            break;
          case 5:
            message.channel.send(`:8ball: | My sources say no, **${message.member.displayName}**`);
            break;
          case 6:
            message.channel.send(`:8ball: | Outlook not so good, **${message.member.displayName}**`);
            break;
          case 7:
            message.channel.send(`:8ball: | Signs point to yes, **${message.member.displayName}**`);
            break;
        }
}};