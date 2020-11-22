module.exports = (client) => {

    client.on('guildMemberAdd', (member) => {
        const message = `Bienvenue sur le server "${client.guilds.cache.get('326438580706607106')}". \nRejoins le channel Lobby et écris "Hello" dans le channel ${client.channels.cache.get('326438580706607106')} pour notifier un admin de ta présence.`;
        const userID = member.user;
        userID.send(message)
    });

    client.on('message', message => {
        if (message.content === 'sj') {
            client.emit('guildMemberAdd', message.member);
        }
    });
}