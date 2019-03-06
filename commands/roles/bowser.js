module.exports = {
    name: "bowser",
    description: "Gives the author the role for Bowser",
    usage: " ",
    async run(client, message, args) {

    // Sets roles
    let role1B = client.roles("Mario Fan");
    let role2B = client.roles("Luigi Fan");
    let role3B = client.roles("Yoshi Fan");
    let role4B = client.roles("Peach Fan");
    let role5B = client.roles("Bowser Fan");
    let role6B = client.roles("Wario Fan");
    let role7B = client.roles("Toad Fan");

    client.remove(role1B);
    client.remove(role2B);
    client.remove(role3B);
    client.remove(role4B);
    client.remove(role6B);
    client.remove(role7B);

    // If they already have the faction role, display this
    if (message.member.roles.has(role5B.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role5B).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Bowser**!`);
        message.delete().catch((err) => console.log(err));
    }
}};