module.exports = {
    name: "clear",
    description: "Clears the specified database",
    aliases: ["delete", "reset", "c"],
    usage: "[database]",
    args: "[database] => 1ups",
    modonly: true,
    async run(client, message, args) {

    // Doesn't effect result but still good to have
    let [speci] = args;

    if (args[0] === '1ups' || args[0] === '1up' || args[0] === '1-up') {

    // Sends a message that awaits an emoji response
    let msgAccept = await message.channel.send('Are you sure you want to clear the database of both factions\' 1-Ups?');

    // Reacts to the message
    msgAccept.react('369650564256104450').then(() => msgAccept.react('373208808685830145'));

    // Filters the reactions so only the user who used the command can return the promise
    const filter = (reaction, user) => {
        return ['369650564256104450', '373208808685830145'].includes(reaction.emoji.id) && user.id === message.author.id;
    };

    // Sets up the listener
    msgAccept.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.id === '369650564256104450') {

                // Sets each faction's 1-ups to 0, displays a message, and logs it to the console
                client.oneups.set(message.guild.id, 0, 'faction1ups');
                client.oneups.set(message.guild.id, 0, 'faction2ups');
                message.reply('Successfully cleared the database of all 1-Ups in my system!');
                console.log(`${message.member.user.tag} cleared the 1-Up enmap`);
            
            } else {
                // If answer = no, display this
                message.reply('Ok I see you thought twice about it. No changes have been made!');
            }
        })
        .catch(collected => {
            // If time expires, log it to the console and display a message
            console.log(`After a minute, ${collected.size} user decided to clear the 1-Up enmap`);
            message.reply('So... I guess we\'re not resetting the database today');
        });
    } else {
        // If args doesn't match, display this
        return message.reply('Please specify a database to clear! Options are: \`1-Ups\`');
    }
}};