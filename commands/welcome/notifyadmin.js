module.exports.run = (client, message, args) => {
    const messageToAdmin = `L'utilisateur ${message.author} vous a notifié et attends d\'être déplacé ou guidé.`
    const messageRecevied = 'Les admins ont été notifiés de ton arrivée. Merci de patienter.'
    const admins = client.guilds.cache.get('326438580706607106').roles.highest.members;
    
    admins.each(a => a.send(messageToAdmin));
    message.author.send(messageRecevied);
}

module.exports.help = {
    aliases: ['notifyadmin, Notifyadmin'],
    args: false,
    newuser : true,
    cooldown: 10,
    description: 'Notifier l\'admin',
    isUserAdmin: false,
    name: 'notifyadmin',
    permissions: false,
    usage: ''
}