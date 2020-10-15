// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level) => {
  // Ensure the teamSettings object exists
  const teamSettings = client.teamSettings.ensure(message.guild.id, client.config.teamSettings);
  // Get the user from the userDB
  const user = client.userDB.get(message.author.id);
  // Pre-define validTeam to determine if the provided team exists and is unlocked
  let validTeam = false;

  // Define a helper method to check if a string is uppercase
  const isUpperCase = (string) => /^[A-Z_0-9]*$/.test(string);
  // Find the team in the teams array
  const character = isUpperCase(teamSettings.teams.find((f) => f.toLowerCase() === args.join(' ').toLowerCase())) ? args.join(' ').toUpperCase() : args.join(' ').toProperCase();

  // If the team exists in the initial teams array
  if (teamSettings.teams.includes(character)) {
    // Set validTeam to true so the role can be added
    validTeam = true;
  } else if (teamSettings.unlockableTeams.find((c) => c.teams.includes(character))) {
    // If the team is an unlockable team

    // Find the object corresponding to the team provided
    const characterObject = teamSettings.unlockableTeams.find((c) => c.teams.includes(character));
    // If the user is a high enough rank to join this team, set validTeam to true
    // If the user does not have a high enough rank, error on team not unlocked
    if (characterObject.rankNeeded <= user.rank) {
      validTeam = true;
    } else {
      message.error('Not Unlocked!', `You haven't unlocked that team yet! You must reach \`rank ${characterObject.rankNeeded}\` to unlock **${character}**! Read more about the ranking system in <#714725324239405096>!`);
    }
  } else {
    // If the team provided is neither in the initial array or unlockable, error on invalid character
    message.error('Invalid Character!', `Valid characters include: **${teamSettings.teams.join('**, **')} ${teamSettings.unlockableTeams.map((obj) => obj.teams.join('**, **')).join('**, **')}**`);
  }

  // If the team is valid
  if (validTeam) {
    // Find the team role
    const role = message.guild.roles.cache.find((r) => r.name === `Team ${character}`);

    // If the member does not have this team role
    if (!message.member.roles.cache.has(role.id)) {
      // If the member has a different team role, find it and remove it
      if (message.member.roles.cache.some((r) => r.name.includes('Team'))) {
        await message.member.roles.remove(message.member.roles.cache.find((r) => r.name.includes('Team')));
      }

      // Add the team role to the member, display a success message, and delete the message that initiated the command
      // If an error is caught, error to the console
      message.member.roles.add(role)
        .then(() => {
          message.success('Success!', `${message.author}, you've successfully joined **${character}**!`);
          message.delete().catch(console.error);
        })
        .catch(console.error);
    } else {
      // If the member has the role for the provided team already, error on already chosen this character
      message.error("You've Already Chosen This Character!", `You've already chosen **${character}** as your team!`);
    }
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
  args: 1,
};

module.exports.help = {
  name: 'team',
  category: 'roles',
  description: 'Joins the specified team',
  usage: 'team <character>',
  details: '<character> => One of the current characters available to join',
};
