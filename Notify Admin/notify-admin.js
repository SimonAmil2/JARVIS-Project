module.exports = (client) => {

    client.on('message', (message) => {
        if (message.author.bot) return;
        if (message.content === 'Hello' && message.channel.id === '326438580706607106') {
            const messageToAdmin = `L'utilisateur ${message.author} vous a notifié et attends d\'être déplacé ou guidé.`
            const messageRecevied = 'Les admins ont été notifiés de ton arrivée. Merci de patienter.'
            const admins = client.guilds.cache.get('326438580706607106').roles.highest.members;
            
            admins.each(a => a.send(messageToAdmin))
            message.author.send(messageRecevied)
        }
    });
}