module.exports = { name: 'wizardfrog', description: 'Sends a random Wizardfrog quote', aliases: ['wf'], usage: ' ', modonly: false, async run(client, message, args, Discord) {

    let random = Math.ceil(Math.random() * 22);

    const embed = new Discord.RichEmbed()
        .setAuthor('Wizardfrog Quote')
        .setTimestamp()
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .setColor('#4199c2')

    switch(random) {
        case 1:
        embed.setImage("https://i.imgur.com/H6Z7L7F.jpg");
        message.channel.send(embed);
        break;
        case 2:
        embed.setImage("https://i.imgur.com/dTMnqrN.jpg");
        message.channel.send(embed);
        break;
        case 3:
        embed.setImage("https://i.imgur.com/tyVsYKO.jpg");
        message.channel.send(embed);
        break;
        case 4:
        embed.setImage("https://i.imgur.com/G9AFP53.jpg");
        message.channel.send(embed);
        break;
        case 5:
        embed.setImage("https://i.imgur.com/tvLAHdi.jpg");
        message.channel.send(embed);
        break;
        case 6:
        embed.setImage("https://i.imgur.com/8UnqQJT.jpg");
        message.channel.send(embed);
        break;
        case 7:
        embed.setImage("https://i.imgur.com/8VuHtJL.jpg");
        message.channel.send(embed);
        break;
        case 8:
        embed.setImage("https://i.imgur.com/optTQS7.jpg");
        message.channel.send(embed);
        break;
        case 9:
        embed.setImage("https://i.imgur.com/A0o9FKY.jpg");
        message.channel.send(embed);
        break;
        case 10:
        embed.setImage("https://i.imgur.com/JHM2COl.jpg");
        message.channel.send(embed);
        break;
        case 11:
        embed.setImage("https://i.imgur.com/WHSz9vu.jpg");
        message.channel.send(embed);
        break;
        case 12:
        embed.setImage("https://i.imgur.com/VkWI4Yn.jpg");
        message.channel.send(embed);
        break;
        case 13:
        embed.setImage("https://i.imgur.com/78gyTFL.jpg");
        message.channel.send(embed);
        break;
        case 14:
        embed.setImage("https://i.imgur.com/hDw04NI.jpg");
        message.channel.send(embed);
        break;
        case 15:
        embed.setImage("https://i.imgur.com/UGcbSas.jpg");
        message.channel.send(embed);
        break;
        case 16:
        embed.setImage("https://i.imgur.com/fmdRorh.jpg");
        message.channel.send(embed);
        break;
        case 17:
        embed.setImage("https://i.imgur.com/89rAYRr.jpg");
        message.channel.send(embed);
        break;
        case 18:
        embed.setImage("https://i.imgur.com/XInZFnY.jpg");
        message.channel.send(embed);
        break;
        case 19:
        embed.setImage("https://i.imgur.com/UakzPFf.jpg");
        break;
        case 20:
        embed.setImage("https://i.imgur.com/2J1Br4t.jpg");
        break;
        case 21:
        embed.setImage("https://i.imgur.com/jt8LLLo.jpg");
        break;
        case 22:
        embed.setImage("https://i.imgur.com/qDSmXoz.jpg");
        break;
    }
}};