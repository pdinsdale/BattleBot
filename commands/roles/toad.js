module.exports = {
    name: "toad",
    description: "Gives the author the role for Toad",
    usage: " ",
    async run(client, message, args) {

    // Sets factions to the roles
    let role1T = client.roles("Mario Fan");
    let role2T = client.roles("Luigi Fan");
    let role3T = client.roles("Yoshi Fan");
    let role4T = client.roles("Peach Fan");
    let role5T = client.roles("Bowser Fan");
    let role6T = client.roles("Wario Fan");
    let role7T = client.roles("Toad Fan");

    client.remove(role1T);
    client.remove(role2T);
    client.remove(role3T);
    client.remove(role4T);
    client.remove(role5T);
    client.remove(role6T);

    // If they already have the faction role, display this
    if (message.member.roles.has(role7T.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role7T).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Toad**!`);
        message.delete().catch((err) => console.log(err));
    }
}};