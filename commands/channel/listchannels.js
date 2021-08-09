module.exports.run = (client, message, args) => {
    this.listChannelsByType(message);
}

module.exports.listChannelsByType = (message, type) => {
    let channels = message.guild.channels.cache;
    if (channels) {
        let messageTitle = "";
        switch(type) {
            case 'voice':
                messageTitle = "Voici les différents voice channels sur ce serveur :"
                break;
            case 'text' :
                messageTitle = "Voici les différents text channels sur ce serveur :"
                break;
            case 'category' :
                messageTitle = "Voici les différentes catégories sur ce serveur :"
                break;
            default :
                messageTitle = "Voici les différents channels sur ce serveur :"
                break;
        }
        message.channel.send(messageTitle);  

        this.listChannels(message, channels, type);
    }
}

module.exports.listChannels = (message, channels, type) => {
    if (type) {
       channels.filter(c => c.type === type).forEach(channel => {
            message.channel.send(`${channel.id} : ${channel.name}`);
        });
    }
    else {
        channels.forEach(channel => {
            message.channel.send(`${channel.id} : ${channel.name}`);
        });
    }
}

module.exports.help = {
    aliases: ['lc', 'listc', 'listallc'],
    args: false,
    cooldown: 10,
    description: 'Déplacer un utilisateur dans un channel',
    isUserAdmin: false,
    name: 'listchannels',
    permissions: true,
    usage: ''
}