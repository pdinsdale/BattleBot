module.exports = {
    name: "yoshi",
    description: "Gives the author the role for Yoshi",
    usage: " ",
    async run(client, message, args) {

    // Sets factions to the roles
    let role1Y = client.roles("Mario Fan");
    let role2Y = client.roles("Luigi Fan");
    let role3Y = client.roles("Yoshi Fan");
    let role4Y = client.roles("Peach Fan");
    let role5Y = client.roles("Bowser Fan");
    let role6Y = client.roles("Wario Fan");
    let role7Y = client.roles("Toad Fan");

    client.remove(role1Y);
    client.remove(role2Y);
    client.remove(role4Y);
    client.remove(role5Y);
    client.remove(role6Y);
    client.remove(role7Y);

    // If they already have the faction role, display this
    if (message.member.roles.has(role3Y.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role3Y).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Yoshi**!`);
        message.delete().catch((err) => console.log(err));
    }
}};