module.exports = { name: 'set', description: 'Sets the specified configuration', usage: '[configuration] [new setting]', args: '[configuration] => prefix, faction1, faction2, faction1Role, faction2Role, faction1Cmd, faction2Cmd \n[new setting] => Any string that you wish for the new setting to be', modonly: true, async run(client, message, args) {

    // Getting the key and value from args
    const [prop, ...value] = args;

    if (!prop) return message.reply('Please specify a proper key!');
    if (!args[1]) return message.reply('Please specify a proper value!');

    let emoji1 = '✅';
    let emoji2 = '❌';

    if (message.guild.id === '355119082808541184') {
        emoji1 = '369650564256104450';
        emoji2 = '373208808685830145';
    }

    let msgAccept = await message.channel.send(`Are you sure you want to change **${prop}** to \`${value.join(" ")}\`?`);

    // Reacts to the message
    msgAccept.react(emoji1).then(() => msgAccept.react(emoji2));

    // Filters the reactions so only the user who used the command can return the promise
    const filter = (reaction, user) => {
        return [emoji1, emoji2].includes(reaction.emoji.id || reaction.emoji.name) && user.id === message.author.id;
    };
    
    // Sets up the listener
    msgAccept.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.id === emoji1 || reaction.emoji.name === emoji1) {
    
                // Check if the key exists
                if(!client.settings.has(message.guild.id, prop)) return message.reply("This key is not in the configuration!");
                
                // Changing the value of the provided key
                client.settings.set(message.guild.id, value.join(" "), prop);
                
                // Sending a successful message and logging it
                console.log(`${message.member.user.tag} has changed ${prop} to ${value.join(" ")} in ${message.guild.name}`);
                message.reply(`Configuration item **${prop}** has been changed to: \`${value.join(" ")}\``);
                
            } else {
                // If answer = no, display this
                message.reply('Ok I see you thought twice about it. No changes have been made!');
            }
        })
        .catch(collected => {
            // If time expires, log it to the console and display a message
            console.log(`After a minute, ${collected.size} users decided to change the configuration settings`);
            message.reply('So... I guess we\'re not changing the configuration settings today');
        });
}};