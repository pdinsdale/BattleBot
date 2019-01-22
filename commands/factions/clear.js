module.exports = { name: 'command-name', async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    let [speci] = args;

    if (args[0] === '1ups' || args[0] === '1up' || args[0] === '1-up') {

    let msgAccept = await message.channel.send('Are you sure you want to clear the database of both factions\' 1-Ups?');

    msgAccept.react('369650564256104450').then(() => msgAccept.react('373208808685830145'));

    const filter = (reaction, user) => {
        return ['369650564256104450', '373208808685830145'].includes(reaction.emoji.id) && user.id === message.author.id;
    };

    msgAccept.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.id === '369650564256104450') {

                client.oneups.set(message.guild.id, 0, 'faction1ups');
                client.oneups.set(message.guild.id, 0, 'faction2ups');
                message.reply('Successfully cleared the database of all 1-Ups in my system!');
                console.log(`${message.member.user.tag} cleared the 1-Up enmap`);
            
            } else {
                message.reply('Ok I see you thought twice about it. No changes have been made!');
            }
        })
        .catch(collected => {
            console.log(`After a minute, ${collected.size} user decided to clear the 1-Up enmap`);
            message.reply('So... I guess we\'re not resetting the database today');
        });
    } else {
        return message.reply('Please specify a database to clear! Options are: \`1-Ups\`');
    }
}};