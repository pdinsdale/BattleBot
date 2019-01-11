module.exports = { name: 'command-name', async run(client, message, args) {

    if(!message.member.roles.some(r=>["Moderator"].includes(r.name)) )
    return message.reply("You don't have permissions to use this!");

    let roleID1 = '530135992644927508';
    let memWF1 = message.guild.roles.get(roleID1).members;

    let roleID2 = '530136385638760451';
    let memWF2 = message.guild.roles.get(roleID2).members;

    message.channel.send(`**${client.faction1}:** \`${memWF1.size} members\` \n**${client.faction2}:** \`${memWF2.size} members\``);

}};