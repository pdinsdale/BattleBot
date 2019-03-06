module.exports = {
    name: "peach",
    description: "Gives the author the role for Peach",
    usage: " ",
    async run(client, message, args) {

    // Sets factions to the roles
    let role1P = client.roles("Mario Fan");
    let role2P = client.roles("Luigi Fan");
    let role3P = client.roles("Yoshi Fan");
    let role4P = client.roles("Peach Fan");
    let role5P = client.roles("Bowser Fan");
    let role6P = client.roles("Wario Fan");
    let role7P = client.roles("Toad Fan");

    client.remove(role1P);
    client.remove(role2P);
    client.remove(role3P);
    client.remove(role5P);
    client.remove(role6P);
    client.remove(role7P);

    // If they already have the faction role, display this
    if (message.member.roles.has(role4P.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role4P).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Peach**!`);
        message.delete().catch((err) => console.log(err));
    }
}};