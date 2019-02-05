const ascii = require('ascii-art');

module.exports = { name: 'ascii', aliases: ['asci', 'asc'], async run(client, message, args) {

    // Sets font and joins args
    ascii.font(args.join(' '), 'Doom', function(rendered) {

        // Renders the image
        rendered = rendered.trimRight();

        // If args[0] is too long, display this
        if (rendered.length > 2000) return message.channel.send('Sorry, that message is too long!');

        // Sends the rendered message
        message.channel.send(rendered, {
            code: 'nd'
        });
    });
}};