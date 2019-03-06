module.exports = {
    name: "luigi",
    description: "Gives the author the role for Luigi",
    usage: " ",
    async run(client, message, args) {

    // Sets factions to the roles
    let role1L = client.roles("Mario Fan");
    let role2L = client.roles("Luigi Fan");
    let role3L = client.roles("Yoshi Fan");
    let role4L = client.roles("Peach Fan");
    let role5L = client.roles("Bowser Fan");
    let role6L = client.roles("Wario Fan");
    let role7L = client.roles("Toad Fan");

    client.remove(role1L);
    client.remove(role3L);
    client.remove(role4L);
    client.remove(role5L);
    client.remove(role6L);
    client.remove(role7L);

    // If they already have the faction role, display this
    if (message.member.roles.has(role2L.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role2L).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Luigi**!`);
        message.delete().catch((err) => console.log(err));
    }
}};