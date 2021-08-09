const { addRole } = require("./add");

module.exports.run = (client, message, args) => {
    let roles = message.mentions.roles;
    let mentionedMember = message.guild.member(message.mentions.users.first());

    roles.forEach(r => {
        addRole(message,r,mentionedMember);
    });
}


module.exports.help = {
    name: 'adds',
    aliases: ['adds'],
    mentionedArgs : true,
    argsSize : 2,
    description: 'Ajouter plusieurs rôles',
    args: true,
    usage: '<@role1> <@role2> ... <@user>',
    cooldown: 10,
    permissions: true,
    isUserAdmin: false
}