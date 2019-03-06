module.exports = {
    name: "ranks",
    description: "Shows a list of selected roles and their member counts",
    usage: " ",
    modonly: true,
    enabled: false,
    async run(client, message, args) {

    // Sets roles
    let adminRole = client.roles("Admin");
    let modRole = client.roles("Moderator");
    let botRole = client.roles("ATM");
    let consRole = client.roles("Consultant");
    let rMarioRole = client.roles("r/Mario Staff");
    let marioWikiRole = client.roles("MarioWiki Staff");
    let beanBeanRole = client.roles("Beanbean Ambassador");
    let roboBBRole = client.roles("Robo Brick Block");
    let BBRole = client.roles("Brick Block");
    let lemonRole = client.roles("Lemon Grabber");
    let troubleRole = client.roles("Life Shroom");
    let artRole = client.roles("Art Helper");
    let devRole = client.roles("Developer");
    let faction1RoleD = client.roles(`${client.guildConfig.faction1Role}`);
    let faction2RoleD = client.roles(`${client.guildConfig.faction2Role}`);
    let unspoilRole = client.roles("Unspoiled");
    let smashRole = client.roles("Frequent Fighter");
    let verifiedRole = client.roles("Verified");

    // Displays long stupid message that I had to type up
    message.channel.send(`\`\`\`\nAdmin: ${adminRole.members.size} members\nModerator: ${modRole.members.size} members\nATM: ${botRole.members.size} bots\nConsultant: ${consRole.members.size} members\nr/Mario Staff: ${rMarioRole.members.size} members\nMarioWiki Staff: ${marioWikiRole.members.size} members\nBeanbean Ambassador: ${beanBeanRole.members.size} members\nRobo Brick Block: ${roboBBRole.members.size} members\nBrick Block: ${BBRole.members.size} members\nLemon Grabber: ${lemonRole.members.size} members\nLife Shroom: ${troubleRole.members.size} members\nArt Helper: ${artRole.members.size} members\nDeveloper: ${devRole.members.size} members\n${client.guildConfig.faction1Role}: ${faction1RoleD.members.size} members\n${client.guildConfig.faction2Role}: ${faction2RoleD.members.size}\nUnspoiled: ${unspoilRole.members.size} members\nFrequent Fighter: ${smashRole.members.size} members\nVerified: ${verifiedRole.members.size} members\`\`\``);
}};