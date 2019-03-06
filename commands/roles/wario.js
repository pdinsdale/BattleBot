module.exports = {
    name: "wario",
    description: "Gives the author the role for Wario",
    usage: " ",
    async run(client, message, args) {

    // Sets factions to the roles
    let role1W = client.roles("Mario Fan");
    let role2W = client.roles("Luigi Fan");
    let role3W = client.roles("Yoshi Fan");
    let role4W = client.roles("Peach Fan");
    let role5W = client.roles("Bowser Fan");
    let role6W = client.roles("Wario Fan");
    let role7W = client.roles("Toad Fan");

    client.remove(role1W);
    client.remove(role2W);
    client.remove(role3W);
    client.remove(role4W);
    client.remove(role5W);
    client.remove(role7W);

    // If they already have the faction role, display this
    if (message.member.roles.has(role6W.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role6W).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Wario**!`);
        message.delete().catch((err) => console.log(err));
    }
}};