

module.exports = (client) => {

    // Ready Stuff
    const activities_list = [
        'with some code',
        `SMO with ${client.users.size} users`,
        'with the developer\'s console',
        `with the ${client.config.prefix}help command`,
        'as the mods\' puppet',
        `with ${client.version}`,
        'SSBU with Phoenix#0408'
    ];

    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1)+ 1);
    
    client.user.setActivity(activities_list[index]);
    }, 10000);

    console.log(`Ready to follow orders sir, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
};