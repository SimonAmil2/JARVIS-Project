module.exports.run = (client, message, args) => {
    // Get role
    let mentionedRole = message.mentions.roles.first();
    let mentionedMember = message.guild.member(message.mentions.users.first());

    this.addRole(message,mentionedRole,mentionedMember);
  
}

module.exports.addRole = (message, mentionedRole, mentionedMember) => {
    if (mentionedMember && mentionedRole) {
        if (mentionedMember.roles.cache.has(mentionedRole.id)) {
            return message.channel.send(`Vous avez déjà le rôle ${mentionedRole.name} ! Essayez de nouveau ...`);
        }
        
        else {
            mentionedMember.roles.add(mentionedRole)
            .then(user => message.channel.send(`${user}, vous possédez maintenant le rôle ${mentionedRole}`))
            .catch(err => console.log(err));
        }
    }
}


module.exports.help = {
    aliases: ['add'],
    args: true,
    mentionedArgs : true,
    argsSize : 2,
    cooldown: 10,
    description: 'Ajouter un rôle',
    isUserAdmin: false,
    name: 'add',
    permissions: true,
    usage: '<@role> <@user>'
}