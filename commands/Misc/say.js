module.exports.run = (client, message, args) => {
    message.channel.send(args.join(' '));
}

module.exports.help = {
    aliases: ['repeat', 'rep'],
    args: true,
    cooldown: 10,
    description: "Renvoi le message de l'utilisateur",
    isUserAdmin: false,
    name: 'say',
    permissions: false,
    usage: '<message>'
}