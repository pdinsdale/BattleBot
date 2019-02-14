module.exports = { name: '1ups', description: 'Controls the 1-Up database', aliases: ['1up'], usage: '[faction] [operation] [number]', args: '[faction] => Mario, Luigi \n[operation] => add, subtract \n[number] => 1-∞', modonly: true, async run(client, message, args) {

    // If the channel isn't #bot-testing in 1-Up World, return
    if (!message.channel.id === '417918334621712384') return;

    // Ensures that the data exists in the Enmap
    client.oneups.ensure(message.guild.id, {
        guild: message.guild.id,
        faction1ups: 0,
        faction2ups: 0
    });

    // Gets the values of each faction's 1-ups
    let f1ups = client.oneups.get(message.guild.id, 'faction1ups');
    let f2ups = client.oneups.get(message.guild.id, 'faction2ups');

    // Displays each faction's 1-ups
    if (!args[0]) return message.channel.send(`**${client.faction1}: **\`${f1ups} 1-Ups\`\n**${client.faction2}: **\`${f2ups} 1-Ups\``);

    // Setting args which doesn't do anything to effect the results but nice to have so we know what each args is for
    let [faction, operation, number] = args;

    // Parses args[2] from a string into an integer
    const queuedOneUps = parseInt(args[2], 10);

    if (args[0] === 'mario' || args[0] === client.faction1) {

        if (args[1] === 'add') {

            // Ensures the data exists
            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            // Gets the values and adds them
            let oneups1 = client.oneups.get(message.guild.id, 'faction1ups');
            oneups1 += queuedOneUps;
    
            // Sets the Enmap to the added values
            client.oneups.set(message.guild.id, oneups1, 'faction1ups');
    
            // Displays this message and logs it to the console
            message.channel.send(`Successfully added a **${queuedOneUps}-Up** to **${client.faction1}!**`);
            console.log(`${message.member.user.tag} added a ${queuedOneUps}-Up to ${client.faction1}`);

        } else if (args[1] === 'subtract' || args[1] === 'remove') {

            // Ensures the data exists
            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            // Gets the values and subtracts them
            let oneups1 = client.oneups.get(message.guild.id, 'faction1ups');
            oneups1 -= queuedOneUps;
    
            // Sets the Enmap to the subtracted values
            client.oneups.set(message.guild.id, oneups1, 'faction1ups');
    
            // Displays this message and logs it to the console
            message.channel.send(`Successfully subtracted a **${queuedOneUps}-Up** from **${client.faction1}!**`);
            console.log(`${message.member.user.tag} subtracted a ${queuedOneUps}-Up from ${client.faction1}`);

        } else {
            // If args doesn't match the above, display this
            return message.reply('Please specify what to do with the 1-Up database!');
        }
    } else if (args[0] === 'luigi' || args[0] === client.faction2) {

        if (args[1] === 'add') {

            // Ensures the data exists
            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            // Gets the values and adds them
            let oneups2 = client.oneups.get(message.guild.id, 'faction2ups');
            oneups2 += queuedOneUps;
    
            // Sets the Enmap to the added values
            client.oneups.set(message.guild.id, oneups2, 'faction2ups');
    
            // Displays this message and logs it to the console
            message.channel.send(`Successfully added a **${queuedOneUps}-Up** to **${client.faction2}!**`);
            console.log(`${message.member.user.tag} added a ${queuedOneUps}-Up to ${client.faction2}`);

        } else if (args[1] === 'subtract' || args[1] === 'remove') {

            // Ensures the data exists
            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            // Gets the values and subtracts them
            let oneups2 = client.oneups.get(message.guild.id, 'faction2ups');
            oneups2 -= queuedOneUps;
    
            // Sets the Enmap to the subtracted values
            client.oneups.set(message.guild.id, oneups2, 'faction2ups');
    
            // Displays this message and logs it to the console
            message.channel.send(`Successfully subtracted a **${queuedOneUps}-Up** from **${client.faction2}!**`);
            console.log(`${message.member.user.tag} subtracted a ${queuedOneUps}-Up from ${client.faction2}`);

        } else {
            // If args doesn't match the above, display this
            return message.reply('Please specify what to do with the 1-Up database!');

        }
    } else {
        // If args doesn't match the above, display this
        return message.reply('Please specify the faction you would like to edit in the database!');
    }
}};