module.exports = {
    name: "slots",
    description: "Plays a quick game of slots",
    usage: " ",
    async run(client, message, args, Discord) {

    // Setting up results with randomness
    let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));

    if (slots[result1] === slots[result2] && slots[result3]) {
        // If you win
        let wEmbed = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .addField('You Won!', 'Play again real soon!')
            .setColor("#4199c2");
        message.channel.send(wEmbed);
    } else {
        // If you lose
        let embed = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(message.member.user.tag, message.author.avatarURL)
            .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result', slots[result1] + slots[result2] + slots[result3], true)
            .addField('You Lost!', 'Play again real soon!')
            .setColor("#4199c2");
        message.channel.send(embed);
    }

}};