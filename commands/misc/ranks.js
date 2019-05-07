module.exports = {
  name: 'ranks',
  category: 'misc',
  description: 'Shows a list of selected roles and their member counts',
  usage: ' ',
  modonly: true,
  enabled: false,
  // eslint-disable-next-line no-unused-vars
  async run(client, message, args) {
    // Sets roles
    const adminRole = client.roleFind(message, 'Admin');
    const modRole = client.roleFind(message, 'Moderator');
    const botRole = client.roleFind(message, 'ATM');
    const consRole = client.roleFind(message, 'Consultant');
    const rMarioRole = client.roleFind(message, 'r/Mario Staff');
    const marioWikiRole = client.roleFind(message, 'MarioWiki Staff');
    const beanBeanRole = client.roleFind(message, 'Beanbean Ambassador');
    const roboBBRole = client.roleFind(message, 'Robo Brick Block');
    const BBRole = client.roleFind(message, 'Brick Block');
    const lemonRole = client.roleFind(message, 'Lemon Grabber');
    const troubleRole = client.roleFind(message, 'Life Shroom');
    const artRole = client.roleFind(message, 'Art Helper');
    const devRole = client.roleFind(message, 'Developer');
    const faction1RoleD = client.roleFind(message, `${client.guildConfig.faction1Role}`);
    const faction2RoleD = client.roleFind(message, `${client.guildConfig.faction2Role}`);
    const unspoilRole = client.roleFind(message, 'Unspoiled');
    const smashRole = client.roleFind(message, 'Frequent Fighter');
    const verifiedRole = client.roleFind(message, 'Verified');

    // Displays long stupid message that I had to type up
    message.channel.send(`\`\`\`\nAdmin: ${adminRole.members.size} members\nModerator: ${modRole.members.size} members\nATM: ${botRole.members.size} bots\nConsultant: ${consRole.members.size} members\nr/Mario Staff: ${rMarioRole.members.size} members\nMarioWiki Staff: ${marioWikiRole.members.size} members\nBeanbean Ambassador: ${beanBeanRole.members.size} members\nRobo Brick Block: ${roboBBRole.members.size} members\nBrick Block: ${BBRole.members.size} members\nLemon Grabber: ${lemonRole.members.size} members\nLife Shroom: ${troubleRole.members.size} members\nArt Helper: ${artRole.members.size} members\nDeveloper: ${devRole.members.size} members\n${client.guildConfig.faction1Role}: ${faction1RoleD.members.size} members\n${client.guildConfig.faction2Role}: ${faction2RoleD.members.size}\nUnspoiled: ${unspoilRole.members.size} members\nFrequent Fighter: ${smashRole.members.size} members\nVerified: ${verifiedRole.members.size} members\`\`\``);
  },
};
