module.exports = {
    name: "mario",
    description: "Gives the author the role for Mario",
    usage: " ",
    async run(client, message, args) {

    // Sets factions to the roles
    let role1M = client.roles("Mario Fan");
    let role2M = client.roles("Luigi Fan");
    let role3M = client.roles("Yoshi Fan");
    let role4M = client.roles("Peach Fan");
    let role5M = client.roles("Bowser Fan");
    let role6M = client.roles("Wario Fan");
    let role7M = client.roles("Toad Fan");

    client.remove(role2M);
    client.remove(role3M);
    client.remove(role4M);
    client.remove(role5M);
    client.remove(role6M);
    client.remove(role7M);

    // If they already have the faction role, display this
    if (message.member.roles.has(role1M.id)) {
        
        message.reply("You already chose that character!");
    } else {

        // If not give it to em. If this fails, displays this message which alerts me and logs to the console
        message.member.addRole(role1M).catch((err) => {
            message.reply(`I couldn't apply the role because <@${client.config.ownerID}> screwed something up in my code. Please ping an online mod to manually apply the role for you.`);
            console.log(err);
        });
        // Sends the success message and deletes the original message to keep chat less clutered
        message.channel.send(`${message.author} has joined **Mario**!`);
        message.delete().catch((err) => console.log(err));
    }
}};