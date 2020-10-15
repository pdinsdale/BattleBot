// eslint-disable-next-line consistent-return
module.exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  // Join the provided arguments and define the pronoun variable to set it later
  const input = args.join(' ');
  let pronoun;

  // Some fancy regex action
  // Basically find whether the user said he, him, she, her, they, or them and set the pronoun variable
  // If all user provided something different, error on invalid pronoun
  if (/(?<!s|t)he(?!r)|him/i.test(input)) {
    pronoun = 'He/Him';
  } else if (/she|her/i.test(input)) {
    pronoun = 'She/Her';
  } else if (/the(y|m)/i.test(input)) {
    pronoun = 'They/Them';
  } else {
    return message.error('Invalid Pronoun!', 'Please input a valid pronoun! Available pronouns are \`he\`, \`she\`, and \`them\`!');
  }

  // Find the role corresponding to the inputted pronoun
  const role = message.guild.roles.cache.find((r) => r.name === pronoun);

  // If member has the pronoun, remove it, display a success message and delete the initial message
  // If an error is caught, error to the console
  if (message.member.roles.cache.has(role.id)) {
    message.member.roles.remove(role)
      .then(() => {
        message.success('Success!', `I've successfully removed the \`${role.name}\` pronoun role from you!`);
        message.delete().catch(console.error);
      }).catch(console.error);
  } else {
    // If member does not have the pronoun, add it, display a success message and the initial message
    // If an error is caught, error to the console
    message.member.roles.add(role)
      .then(() => {
        message.success('Success!', `I've successfully added the \`${role.name}\` pronoun role to you!`);
        message.delete().catch(console.error);
      }).catch(console.error);
  }
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['goby'],
  permLevel: 'User',
  args: 1,
};

module.exports.help = {
  name: 'goesby',
  category: 'roles',
  description: 'Gives the user the specified pronoun role',
  usage: 'goesby <he|she|they>',
  details: 'goesby <he|she|they> => The pronoun role to add',
};
