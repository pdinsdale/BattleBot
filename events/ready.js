module.exports = (client) => {

    // Setting the activities and stuff
    const activities_list = [
        'with some code',
        `SMO with ${client.users.size} users`,
        'with the developer\'s console',
        `with the ${client.config.prefix}help command`,
        'as the mods\' puppet',
        `with ${client.version}`,
        'SSBU with Phoenix#0408'
    ];

    // Calculating time to change activity
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1)+ 1);
    
    // Setting activity
    client.user.setActivity(activities_list[index]);
    }, 10000);

    // Logging a ready message on first boot
    console.log(`Ready to follow orders sir, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
};