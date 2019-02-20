module.exports = { name: 'work', description: 'Earns you coins by working as farious jobs. Gives you 1-500 coins randomly. Has a failure rate of 40%', aliases: ['w'], usage: ' ', cooldown: 20, modonly: false, async run(client, message, args, Discord, eco) {

    let output = await eco.Work(message.author.id, {
        failurerate: 30,
        money: Math.floor(Math.random() * 500),
        jobs: ['Mario\'s Personal Chef', 'Luigi\'s Personal Maid', 'one of Bowser\'s minions', 'Peach\'s Bodyguard', 'Yoshi\'s Lawyer', 'Internal Help for 1-Up World', 'Egadd\'s Assistant', 'Phoenix\'s Right-Hand-Man', 'Bot Support', 'the Koopalings\' Babysitter']
    });
    
    if (output.earned == 0 && output.job === 'Yoshi\'s Lawyer') return message.channel.send(`**${message.member.displayName}**, You failed as \`${output.job}\` and got Yoshi arrested for Tax Fraud!`);
    if (output.earned == 0) return message.channel.send(`**${message.member.displayName}**, You failed as \`${output.job}\` and earned nothing!`);
   
    message.channel.send(`**${message.member.displayName}**, You worked as \`${output.job}\` and earned :money_with_wings: \`${output.earned} coins\`! \nYou now own :money_with_wings: \`${output.balance} coins\`!`);
}};