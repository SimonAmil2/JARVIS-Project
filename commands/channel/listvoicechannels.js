const { listChannelsByType } = require("./listchannels")

module.exports.run = (client, message, args) => {
    listChannelsByType(message,'voice');
}


module.exports.help = {
    aliases: ['lvc', 'listvxc'],
    args: false,
    cooldown: 10,
    description: 'Déplacer un utilisateur dans un channel',
    isUserAdmin: false,
    name: 'listvoicechannels',
    permissions: true,
    usage: ''
}