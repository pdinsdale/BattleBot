module.exports.run = async (client, message, args, level, Discord, eco) => {
  const characters = ['Mario', 'Luigi', 'Bowser', 'Peach', 'Yoshi', 'E. Gadd', 'the Koopalings', 'Toad', 'Toadette', 'Cappy', 'Rosalina', 'Boo', 'Goomba', 'Koopa Troopa', 'Koopa the Quick', 'Donkey Kong', 'Daisy', 'Wario', 'Waluigi', 'Shy Guy'];
  const jobs = ['Personal Chef', 'Minion', 'Bodyguard', 'Lawyer', 'Assistant', 'Babysitter', 'Personal Maid', 'Mailman'];

  const rChar = Math.floor(Math.random() * characters.length);
  const rJob = Math.floor(Math.random() * jobs.length);

  const final = `${characters[rChar]}'s ${jobs[rJob]}`;
  const output = await eco.Work(message.author.id, {
    failurerate: 20,
    money: Math.floor(Math.random() * 5000),
    jobs: [],
  });

  if (output.earned === 0) {
    return message.channel.send(`**${message.member.displayName}**, You failed as \`${final}\` and earned nothing!`);
  }

  return message.channel.send(`**${message.member.displayName}**, You worked as \`${final}\` and earned ${client.emoji.money} \`${output.earned} coins\`! \nYou now own ${client.emoji.money} \`${output.balance} coins\`!`);
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['w'],
  permLevel: 'Verified',
  cooldown: 3600,
};

module.exports.help = {
  name: 'work',
  category: 'economy',
  description: 'Earns you coins by working various jobs. Gives you 1-5000 coins randomly. Has a failure rate of 20%',
  usage: 'work',
};
