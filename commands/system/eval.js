/* eslint-disable no-eval */
// eslint-disable-next-line no-unused-vars
module.exports.run = async (client, message, args, level, Discord) => {
  // Join the args array to get the full code provided
  const code = args.join(' ');

  try {
    // Eval the code provided in an async function
    const evaled = await eval(`(async () => {${code}})()`);
    // Clean the returned value of the evaled code to ensure it's displayed properly and no sensitive information (such as the token) is displayed
    const clean = await client.clean(client, evaled);

    // Send the returned value of the cleaned eval
    message.success('Eval', `\`\`\`js\n${clean}\`\`\``);
  } catch (err) {
    // If an error is caught, clean and send it
    const error = await client.clean(client, err);
    message.error('Eval', `\`\`\`xl\n${error.split('at', 3).join(' ')}\`\`\``);
  }
};

module.exports.conf = {
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Owner',
};

module.exports.help = {
  name: 'eval',
  category: 'system',
  description: 'Executes the given JavaScript code',
  usage: 'eval <code>',
  details: '<code> => Any valid JavaScript code',
};
