const { MessageEmbed, MessageAttachment } = require('discord.js');
const avengersGif = new MessageAttachment('./assets/gifs/avengers_assemble.gif');
const maosGif = new MessageAttachment('./assets/gifs/maos.gif');
const AVENGERSS_ROLE='784865572114268182';
const AGENTS_ROLE = '734429292905234502';

module.exports.run = (client, message, args) => {
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        const mainChannel = client.channels.cache.get('326438580706607106');
        const clashChannel = client.channels.cache.get('784865727215173642');
        const logChannel = client.channels.cache.get('776102166842572840');
        if (oldMember.roles.cache.size <= newMember.roles.cache.size) {

            const embed = new MessageEmbed()
                            .setColor('#9E9E9E')
                            //.setThumbnail(client.user.displayAvatarURL());

            const newRole = newMember.roles.cache
            .filter(r => !oldMember.roles.cache.has(r.id))
            .first();
            if(newRole) {
            // Change username
            //newMember.setNickname(`${newMember.displayName} (${newRole.name})`)
            //if (!oldMember.roles.cache.has(AVENGERSS_ROLE) && newMember.roles.cache.has(AVENGERSS_ROLE)) {
                if(newRole.id === AVENGERSS_ROLE) {
                //clashChannel.send(`Welcome ${newMember} in the ${AVENGERSS_ROLE} team !`);
                    //console.log(clashChannel);
                    embed
                        //.setTitle(`${memberString}, bienvenue dans l'equipe des ${client.guilds.cache.get('326438580706607106').roles.cache.get(AVENGERSS_ROLE).toString()}`)
                        .setDescription(`${newMember}, bienvenue dans l'equipe des ${client.guilds.cache.get('326438580706607106').roles.cache.get(AVENGERSS_ROLE).toString()}`)
                        .attachFiles(avengersGif)
                        .setImage('attachment://avengers_assemble.gif')
                        ;
                    //console.log(oldMember.roles);
                    //console.log(newMember.roles);
                    clashChannel.send(embed);
                    //logChannel.send(embed);
                }
                if(newRole.id === AGENTS_ROLE) {
                    embed
                        //.setTitle(`${newMember}, bienvenue dans l'équipe des ${client.guilds.cache.get('326438580706607106')}`)
                        .setDescription(`${newMember}, bienvenue dans l'équipe des ${client.guilds.cache.get('326438580706607106')}`)
                        .attachFiles(maosGif)
                        .setImage('attachment://maos.gif')
                    ;
                    mainChannel.send(embed);
                    //logChannel.send(embed);
                }
            }
        }
    });
}

module.exports.help = {
    args: false,
    newuser : true,
    selfcommand : true,
    cooldown: 10,
    description: 'Message de bienvenue de rôle',
    isUserAdmin: false,
    name: 'welcomerole',
    permissions: false,
    usage: ''
}