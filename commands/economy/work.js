module.exports.run = async (client, message, args, level, Discord, eco) => {
  // Get the starbits emoji
  const starbits = client.emojis.cache.get(client.emoji.starbits);
  // Define characters and jobs arrays
  const characters = ['Mario', 'Luigi', 'Bowser', 'Peach', 'Yoshi', 'E. Gadd', 'the Koopalings', 'Toad', 'Toadette', 'Cappy', 'Rosalina', 'Boo', 'Goomba', 'Koopa Troopa', 'Koopa the Quick', 'Donkey Kong', 'Daisy', 'Wario', 'Waluigi', 'Shy Guy'];
  const jobs = ['Personal Chef', 'Minion', 'Bodyguard', 'Lawyer', 'Assistant', 'Babysitter', 'Personal Maid', 'Mailman'];

  // Get a random character and job
  const rChar = Math.floor(Math.random() * characters.length);
  const rJob = Math.floor(Math.random() * jobs.length);

  // Create final string and get output from pre-built work function
  const final = `${characters[rChar]}'s ${jobs[rJob]}`;
  const output = await eco.Work(message.author.id, {
    failurerate: 20, // Failure rate of 20%
    money: Math.floor(Math.random() * 5000), // Random money output between 1 and 5000
    jobs: [],
  });

  // If work failed, error on failed
  if (output.earned === 0) {
    return message.error(`You Failed as ${final}!`, `**${message.member.displayName}**, You failed as \`${final}\` and earned nothing!`);
  }

  // Display success message with appropriate strings and calculations
  return message.success(`You Successfully Worked as ${final}!`, `**${message.member.displayName}**, You worked as \`${final}\` and earned ${starbits} \`${output.earned.toLocaleString()} starbits\`! \nYou now own ${starbits} \`${output.balance.toLocaleString()} starbits\`!`);
};

module.exports.conf = {
  guildOnly: true,
  aliases: ['w'],
  permLevel: 'Verified',
  cooldown: 3600,
};

module.exports.help = {
  name: 'work',
  category: 'economy',
  description: 'Earns you starbits by working various jobs. Gives you 1-5000 starbits randomly. Has a failure rate of 20%',
  usage: 'work',
};
