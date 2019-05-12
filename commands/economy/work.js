module.exports = {
  name: 'work',
  category: 'economy',
  description: 'Earns you coins by working various jobs. Gives you 1-500 coins randomly. Has a failure rate of 30%',
  aliases: ['w'],
  usage: ' ',
  cooldown: 20,
  async run(client, message, args, Discord, eco) {
    const characters = ['Mario', 'Luigi', 'Bowser', 'Peach', 'Yoshi', 'Egadd', 'the Koopalings', 'Toad', 'Cappy', 'Rosalina', 'Boo', 'Goomba', 'Koopa Troopa', 'Koopa the Quick', 'Donkey Kong', 'Daisy', 'Wario', 'Waluigi'];
    const jobs = ['Personal Chef', 'Minion', 'Bodyguard', 'Lawyer', 'Assistant', 'Babysitter', 'Personal Maid', 'Mailman'];

    const rChar = Math.floor(Math.random() * 18);
    const rJob = Math.floor(Math.random() * 8);

    const final = `${characters[rChar]}'s ${jobs[rJob]}`;
    const output = await eco.Work(message.author.id, {
      failurerate: 30,
      money: Math.floor(Math.random() * 500),
      jobs: [],
    });

    if (output.earned === 0 && final === "Yoshi's Lawyer") {
      return message.channel.send(`**${message.member.displayName}**, You failed as \`${output.job}\` and got Yoshi arrested for Tax Fraud!`);
    }
    if (output.earned === 0) {
      return message.channel.send(`**${message.member.displayName}**, You failed as \`${final}\` and earned nothing!`);
    }

    return message.channel.send(`**${message.member.displayName}**, You worked as \`${final}\` and earned :money_with_wings: \`${output.earned} coins\`! \nYou now own :money_with_wings: \`${output.balance} coins\`!`);
  },
};
