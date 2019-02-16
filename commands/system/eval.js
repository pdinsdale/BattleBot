const Discord = require("discord.js");

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = { name: 'eval', description: 'Converts the given string into JS code and executes it', usage: '[code]', args: '[code] => Any valid, executable JS code', modonly: false, owneronly: true, async run(client, message, args) {

    const code = args.join(" ");
    
    const codeEmbed = new Discord.RichEmbed()
    .setFooter(client.version, client.user.displayAvatarURL)
    .setTitle("Eval")
    .setTimestamp()
    .addField("Input", `\`\`\`${code}\`\`\``);

    try {
        let evaled = eval(code);
        
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        codeEmbed.setColor("#37ec4b")
        .addField("Output", `\`\`\`${clean(evaled)}\`\`\``);

        message.channel.send(codeEmbed);

        } catch (err) {
            codeEmbed.setColor("#eb2219")
            .addField("ERROR", `\`\`\`${clean(err)}\`\`\``);

            message.channel.send(codeEmbed);
        }
}};