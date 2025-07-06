const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = (client, PREFIX) => {
    client.on('guildMemberUpdate', async (oldMember, newMember) => {
        const avengersGif = new AttachmentBuilder('./assets/gifs/avengers_assemble.gif');
        const maosGif = new AttachmentBuilder('./assets/gifs/maos.gif');

        const AVENGERS_ROLE = '784865572114268182';
        const AGENTS_ROLE = '734429292905234502';

        const addedRoles = [...newMember.roles.cache.values()].filter(r => !oldMember.roles.cache.has(r.id));
        if (!addedRoles.length) return;

        const newRole = addedRoles[0];
        const embed = new EmbedBuilder().setColor('#9E9E9E');

        if (newRole.id === AVENGERS_ROLE) {
            embed
                .setDescription(`${newMember}, bienvenue dans l'équipe des ${newRole}`)
                .setImage('attachment://avengers_assemble.gif');
            return newMember.guild.channels.cache.get('784865727215173642')
                ?.send({ embeds: [embed], files: [avengersGif] });
        }

        if (newRole.id === AGENTS_ROLE) {
            embed
                .setDescription(`${newMember}, bienvenue dans l'équipe des AGENTS.`)
                .setImage('attachment://maos.gif');
            return newMember.guild.channels.cache.get('326438580706607106')
                ?.send({ embeds: [embed], files: [maosGif] });
        }
    });
};
