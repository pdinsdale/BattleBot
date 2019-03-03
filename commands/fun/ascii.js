const ascii = require("ascii-art");

module.exports = {
    name: "ascii",
    description: "Uses the provided text to make ASCII art. For best results, use with smaller words and phrases",
    aliases: ["asci", "asc"],
    usage: "[Text]",
    args: "[Text] => Any text will suffice but use smaller words or phrases for better results",
    async run(client, message, args) {

    // If no args[0], display this
    if (!args[0]) {
        return message.reply("You did not provide any text!");
    }
    
    // Sets font and joins args
    ascii.font(args.join(" "), "Doom", function(rendered) {

        // Renders the image
        rendered = rendered.trimRight();

        // If args[0] is too long, display this
        if (rendered.length > 2000) {
            return message.channel.send("Sorry, that message is too long!");
        }

        // Sends the rendered message
        message.channel.send(rendered, {
            code: "nd"
        });
    });
}};