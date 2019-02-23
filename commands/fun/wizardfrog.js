module.exports = {
    name: "wizardfrog",
    description: "Sends a random Wizardfrog quote",
    aliases: ["wf"],
    usage: " ",
    async run(client, message, args, Discord) {

    let random = Math.ceil(Math.random() * 26);

    const embed = new Discord.RichEmbed()
        .setAuthor("Wizardfrog Quote")
        .setTimestamp()
        .setFooter(`Created and Maintained by Phoenix#0408 | ${client.version}`, client.user.displayAvatarURL)
        .setColor("#4199c2");

    function wizardfrog(image) {
        embed.setImage(image);
        message.channel.send(embed);
    }

    switch(random) {
        case 1:
        wizardfrog("https://i.imgur.com/H6Z7L7F.jpg");
        break;
        case 2:
        wizardfrog("https://i.imgur.com/dTMnqrN.jpg");
        break;
        case 3:
        wizardfrog("https://i.imgur.com/tyVsYKO.jpg");
        break;
        case 4:
        wizardfrog("https://i.imgur.com/G9AFP53.jpg");
        break;
        case 5:
        wizardfrog("https://i.imgur.com/tvLAHdi.jpg");
        break;
        case 6:
        wizardfrog("https://i.imgur.com/8UnqQJT.jpg");
        break;
        case 7:
        wizardfrog("https://i.imgur.com/8VuHtJL.jpg");
        break;
        case 8:
        wizardfrog("https://i.imgur.com/optTQS7.jpg");
        break;
        case 9:
        wizardfrog("https://i.imgur.com/A0o9FKY.jpg");
        break;
        case 10:
        wizardfrog("https://i.imgur.com/JHM2COl.jpg");
        break;
        case 11:
        wizardfrog("https://i.imgur.com/WHSz9vu.jpg");
        break;
        case 12:
        wizardfrog("https://i.imgur.com/VkWI4Yn.jpg");
        break;
        case 13:
        wizardfrog("https://i.imgur.com/78gyTFL.jpg");
        break;
        case 14:
        wizardfrog("https://i.imgur.com/hDw04NI.jpg");
        break;
        case 15:
        wizardfrog("https://i.imgur.com/UGcbSas.jpg");
        break;
        case 16:
        wizardfrog("https://i.imgur.com/fmdRorh.jpg");
        break;
        case 17:
        wizardfrog("https://i.imgur.com/89rAYRr.jpg");
        break;
        case 18:
        wizardfrog("https://i.imgur.com/XInZFnY.jpg");
        break;
        case 19:
        wizardfrog("https://i.imgur.com/UakzPFf.jpg");
        break;
        case 20:
        wizardfrog("https://i.imgur.com/2J1Br4t.jpg");
        break;
        case 21:
        wizardfrog("https://i.imgur.com/jt8LLLo.jpg");
        break;
        case 22:
        wizardfrog("https://i.imgur.com/qDSmXoz.jpg");
        break;
        case 23:
        wizardfrog("https://i.imgur.com/mcPAKY8.jpg");
        break;
        case 24:
        wizardfrog("https://i.imgur.com/WKHnnP6.jpg");
        break;
        case 25:
        wizardfrog("https://i.imgur.com/0ZbWNle.jpg");
        break;
        case 26:
        wizardfrog("https://i.imgur.com/vnf8SLG.jpg");
        break;
    }
}};