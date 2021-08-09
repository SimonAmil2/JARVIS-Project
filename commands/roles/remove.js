module.exports.run = (client, message, args) => {
    // Get role
    let mentionedRole = message.mentions.roles.first();
    let mentionedMember = message.guild.member(message.mentions.users.first());

    this.removeRole(message,mentionedRole,mentionedMember);
}

module.exports.removeRole = (message, mentionedRole, mentionedMember) => {
    if (mentionedMember && mentionedRole) {
        if (!mentionedMember.roles.cache.has(mentionedRole.id)) {
            return message.channel.send(`${mentionedMember} ne posséde pas le rôle ${mentionedRole} !`);
        }
        
        else {
            message.member.roles.remove(mentionedRole)
                .then(user => message.channel.send(`${user} ne posséde plus le rôle ${mentionedRole}`))
                .catch(err => console.log(err));
        }
    }
}

module.exports.help = {
    name: 'remove',
    description: 'Enlever un ou plusieurs rôle',
    args: true,
    mentionedArgs : true,
    argsSize : 2,
    aliases: ['rm'],
    usage: '<@role> <@user>',
    cooldown: 10,
    permissions: true,
    isUserAdmin: false
}