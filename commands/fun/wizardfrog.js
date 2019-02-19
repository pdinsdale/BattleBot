module.exports = { name: 'wizardfrog', description: 'Sends a random Wizardfrog quote', aliases: ['wf'], usage: ' ', modonly: false, async run(client, message, args, Discord) {

    let random = Math.floor(Math.random() * 15);

    switch(random) {
        case 0:
        message.channel.send({file: "./images/wizardfrog_quotes/image0.jpg"});
        break;
        case 1:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(1).jpg"});
        break;
        case 2:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(2).jpg"});
        break;
        case 3:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(3).jpg"});
        break;
        case 4:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(4).jpg"});
        break;
        case 5:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(5).jpg"});
        break;
        case 6:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(6).jpg"});
        break;
        case 7:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(7).jpg"});
        break;
        case 8:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(8).jpg"});
        break;
        case 9:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(9).jpg"});
        break;
        case 10:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(10).jpg"});
        break;
        case 11:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(11).jpg"});
        break;
        case 12:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(12).jpg"});
        break;
        case 13:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(13).jpg"});
        break;
        case 14:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(14).jpg"});
        break;
        case 15:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(15).jpg"});
        break;
        case 16:
        message.channel.send({file: "./images/wizardfrog_quotes/image0(16).jpg"});
        break;
    }
}};