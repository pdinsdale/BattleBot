module.exports = {
    name: "1ups",
    description: "Controls the 1-Up database",
    aliases: ["1up"],
    usage: "[faction] [operation] [number]",
    args: "[faction] => faction1, faction2 \n[operation] => add, subtract \n[number] => 1-∞",
    modonly: true,
    async run(client, message, args) {

    // If the channel isn't #bot-testing in 1-Up World, return
    if (!message.channel.id === "417918334621712384") {
        return;
    }
    
    // Ensures that the data exists in the Enmap
    client.oneups.ensure(message.guild.id, {
        guild: message.guild.id,
        faction1ups: 0,
        faction2ups: 0
    });

    // Gets the values of each faction's 1-ups
    let f1ups = client.oneups.get(message.guild.id, "faction1ups");
    let f2ups = client.oneups.get(message.guild.id, "faction2ups");

    // Displays each faction's 1-ups
    if (!args[0]) {
        return message.channel.send(`**${client.guildConfig.faction1}: **\`${f1ups} 1-Ups\`\n**${client.guildConfig.faction2}: **\`${f2ups} 1-Ups\``);
    }

    // Setting args which doesn't do anything to effect the results but nice to have so we know what each args is for
    let [faction, operation, number] = args;

    // Parses args[2] from a string into an integer
    const queuedOneUps = parseInt(args[2], 10);

    function addSubtarctStuff(fups, enmapThing, faction) {

        if (args[1] === "add") {
            
            // Gets the values and adds them
            (fups) += queuedOneUps;
        
            // Sets the Enmap to the added values
            client.oneups.set(message.guild.id, (fups), (enmapThing));
        
            // Displays this message and logs it to the console
            message.channel.send(`Successfully added a **${queuedOneUps}-Up** to **${(faction)}!**`);
            console.log(`${message.member.user.tag} added a ${queuedOneUps}-Up to ${(faction)}`);
    
        } else if (args[1] === "subtract" || args[1] === "remove") {
            
            // Gets the values and subtracts them
            (fups) -= queuedOneUps;
        
            // Sets the Enmap to the subtracted values
            client.oneups.set(message.guild.id, (fups), (enmapThing));
        
            // Displays this message and logs it to the console
            message.channel.send(`Successfully subtracted a **${queuedOneUps}-Up** from **${(faction)}!**`);
            console.log(`${message.member.user.tag} subtracted a ${queuedOneUps}-Up from ${(faction)}`);
    
        } else {
            // If args doesn't match the above, display this
            return message.reply("Please specify what to do with the 1-Up database!");
        }
    }

    if (args[0] === client.guildConfig.faction1 || args[0] === "mario") {
        addSubtarctStuff(f1ups, "faction1ups", client.guildConfig.faction1);
    } else if (args[0] === client.guildConfig.faction2 || args[0] === "luigi") {
        addSubtarctStuff(f2ups, "faction2ups", client.guildConfig.faction2);
    } else {
        return message.reply("Please specify a faction to edit in the database!");
    }
}};