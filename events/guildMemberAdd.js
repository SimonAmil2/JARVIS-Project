const path = require('path');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = (client, PREFIX) => {
    client.on('guildMemberAdd', async member => {
        console.log(`guildMemberAdd fired for user: ${member.user.tag}`);
        const maosGif = new AttachmentBuilder(path.join(__dirname, '..', 'assets', 'gifs', 'maos.gif'));

        const embed = new EmbedBuilder()
            .setColor('#9E9E9E')
            .setTitle(`${member.user.username}, bienvenue sur le serveur !`)
            .setDescription(`Écris \`\`\`${PREFIX}notifyadmin\`\`\` dans le channel <#736869260735021058> pour prévenir un admin.`)
            .setThumbnail(client.user.displayAvatarURL())
            .setImage('attachment://maos.gif')
            .setTimestamp();

        try {
            await member.send({ embeds: [embed], files: [maosGif] });
        } catch (err) {
            console.error("Erreur d'envoi de message de bienvenue :", err.message);
        }
    });
};
