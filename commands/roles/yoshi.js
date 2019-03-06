module.exports = {
    name: "yoshi",
    description: "Gives the author the role for Yoshi",
    usage: " ",
    async run(client, message, args) {

    // Sets factions to the roles
    let role1 = client.roles("Mario Fan");
    let role2 = client.roles("Luigi Fan");
    let role3 = client.roles("Yoshi Fan");
    let role4 = client.roles("Peach Fan");
    let role5 = client.roles("Bowser Fan");
    let role6 = client.roles("Wario Fan");
    let role7 = client.roles("Toad Fan");

    client.remove(role1);
    client.remove(role2);
    client.remove(role4);
    client.remove(role5);
    client.remove(role6);
    client.remove(role7);

    // If they already have the faction role, display this
    if (message.member.roles.has(role3.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role3).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Yoshi**!`);
        message.delete().catch((err) => console.log(err));
    }
}};