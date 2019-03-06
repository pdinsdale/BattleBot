module.exports = {
    name: "roles",
    description: "Displays the current amount of users that have each color role",
    aliases: ["role"],
    usage: " ",
    modonly: true,
    async run(client, message, args) {

    // Getting size of the roles
    let roleID1 = message.guild.roles.find((role) => role.name === "Mario Fan").id;
    let memWF1 = message.guild.roles.get(roleID1).members;

    let roleID2 = message.guild.roles.find((role) => role.name === "Luigi Fan").id;
    let memWF2 = message.guild.roles.get(roleID2).members;

    let roleID3 = message.guild.roles.find((role) => role.name === "Yoshi Fan").id;
    let memWF3 = message.guild.roles.get(roleID3).members;

    let roleID4 = message.guild.roles.find((role) => role.name === "Peach Fan").id;
    let memWF4 = message.guild.roles.get(roleID4).members;

    let roleID5 = message.guild.roles.find((role) => role.name === "Bowser Fan").id;
    let memWF5 = message.guild.roles.get(roleID5).members;

    let roleID6 = message.guild.roles.find((role) => role.name === "Wario Fan").id;
    let memWF6 = message.guild.roles.get(roleID6).members;

    let roleID7 = message.guild.roles.find((role) => role.name === "Toad Fan").id;
    let memWF7 = message.guild.roles.get(roleID7).members;

    // Displaying the message
    message.channel.send(`**Mario:** \n\`${memWF1.size} members\`\n\n**Luigi:** \n\`${memWF2.size} members\`\n\n**Yoshi:** \n\`${memWF3.size} members\`\n\n**Peach:** \n\`${memWF4.size} members\`\n\n**Bowser:** \n\`${memWF5.size} members\`\n\n**Wario:** \n\`${memWF6.size} members\`\n\n**Toad:** \n\`${memWF7.size} members\`\n`);

}};