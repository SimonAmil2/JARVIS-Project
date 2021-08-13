const { listChannelsByType } = require("./listchannels")

module.exports.run = (client, message, args) => {
    listChannelsByType(message,'text');
}


module.exports.help = {
    aliases: ['ltc', 'listtxtc'],
    args: false,
    cooldown: 10,
    description: 'Déplacer un utilisateur dans un channel',
    isUserAdmin: false,
    name: 'listtextchannels',
    permissions: true,
    usage: ''
}