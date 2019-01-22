module.exports = { name: 'command-name', async run(client, message, args) {

    if (message.guild.id === '478667310341554180') return;

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    client.oneups.ensure(message.guild.id, {
        guild: message.guild.id,
        faction1ups: 0,
        faction2ups: 0
    });

    let f1ups = client.oneups.get(message.guild.id, 'faction1ups');
    let f2ups = client.oneups.get(message.guild.id, 'faction2ups');

    if (!args[0]) return message.channel.send(`**${client.faction1}: **\`${f1ups} 1-Ups\`\n**${client.faction2}: **\`${f2ups} 1-Ups\``);

    let [faction, operation, number] = args;

    const queuedOneUps = parseInt(args[2], 10);

    if (args[0] === 'koopa' || args[0] === client.faction1) {
        if (args[1] === 'add') {

            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            let oneups1 = client.oneups.get(message.guild.id, 'faction1ups');
            oneups1 += queuedOneUps;
    
            client.oneups.set(message.guild.id, oneups1, 'faction1ups');
    
            message.channel.send(`Successfully added **${queuedOneUps} 1-Ups** to **${client.faction1}!**`);
            console.log(`${message.member.user.tag} added ${queuedOneUps} 1-Ups to ${client.faction1}`);

        } else if (args[1] === 'subtract' || args[1] === 'remove') {

            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            let oneups1 = client.oneups.get(message.guild.id, 'faction1ups');
            oneups1 -= queuedOneUps;
    
            client.oneups.set(message.guild.id, oneups1, 'faction1ups');
    
            message.channel.send(`Successfully subtracted **${queuedOneUps} 1-Ups** from **${client.faction1}!**`);
            console.log(`${message.member.user.tag} subtracted ${queuedOneUps} 1-Ups from ${client.faction1}`);

        } else {
            return message.reply('Please specify what to do with the 1-Up database!');
        }
    } else if (args[0] === 'piantissimo' || args[0] === client.faction2) {

        if (args[1] === 'add') {

            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            let oneups2 = client.oneups.get(message.guild.id, 'faction2ups');
            oneups2 += queuedOneUps;
    
            client.oneups.set(message.guild.id, oneups2, 'faction2ups');
    
            message.channel.send(`Successfully added **${queuedOneUps} 1-Ups** to **${client.faction2}!**`);
            console.log(`${message.member.user.tag} added ${queuedOneUps} 1-Ups to ${client.faction2}`);

        } else if (args[1] === 'subtract' || args[1] === 'remove') {

            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });
        
            let oneups2 = client.oneups.get(message.guild.id, 'faction2ups');
            oneups2 -= queuedOneUps;
    
            client.oneups.set(message.guild.id, oneups2, 'faction2ups');
    
            message.channel.send(`Successfully subtracted **${queuedOneUps} 1-Ups** from **${client.faction2}!**`);
            console.log(`${message.member.user.tag} subtracted ${queuedOneUps} 1-Ups from ${client.faction2}`);

        } else {
            return message.reply('Please specify what to do with the 1-Up database!');

        }
    } else {
        return message.reply('Please specify the faction you would like to edit in the database!');
    }
}};