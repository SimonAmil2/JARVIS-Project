module.exports.run = (client, message, args) => {
    let roles = args.join(' ').split(';');

    roles.forEach(rName => {
        let role = message.guild.roles.cache.find(role => role.name === rName.trim());

        if (role) {
            if (message.member.roles.cache.has(role.id)) {
                return message.channel.send(`Vous avez déjà le rôle ${role.name} ! Essayez de nouveau ...`);
            }
            if (role.permissions.has('KICK_MEMBERS', 'BAN_MEMBERS')) {
                return message.channel.send('Vous ne disposez pas des droits nécessaires !');
            }
    
            message.member.roles.add(role)
                .then(user => message.channel.send(`Vous possédez maintenant le rôle ${role} ${user}`))
                .catch(err => console.log(err));
        } else {
            message.channel.send("Le rôle n'existe pas!");
        }
    });
}


module.exports.help = {
    name: 'adds',
    aliases: ['adds'],
    description: 'Ajouter plusieurs rôles',
    args: true,
    usage: '<role1> <role2> ...',
    cooldown: 10,
    permissions: false,
    isUserAdmin: false
}