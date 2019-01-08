module.exports = { name: 'command-name', async run(client, message, args) {

    client.oneups.ensure(message.guild.id, {
        guild: message.guild.id,
        faction1ups: 0,
        faction2ups: 0
    });

    let [operation, number, faction] = args;

    switch(operation.toLowerCase()) {
        case 'add':
        switch(faction.toLowerCase()) {
            case client.faction1: case 'koopa':

            const oneUpsToAdd = parseInt(args[1], 10);
            client.oneups.ensure(message.guild.id, {
                guild: message.guild.id,
                faction1ups: 0,
                faction2ups: 0
            });

            let oneups1 = client.oneups.get(message.guild.id, 'faction1ups')
        }
        break;
        case 'remove': case 'subtract':

        break;
    }

}};