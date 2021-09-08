const { kayn } = require('../../utils/kaynConfig');
const { getMasteryForChamp } = require('../../utils/leagueUtils');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const summoner = args[0];
    const champion = args[1];

    try {
        const {
            id: summonerID,
            summonerLevel,
        } = await kayn.Summoner.by.name(summoner);

        const {  championId, championLevel, championPoints, lastPlayTime } = await getMasteryForChamp(champion, summonerID);
    
        const embed = new MessageEmbed()
            .setAuthor(`${summoner} (Lvl. ${summonerLevel})`)
            .setColor('#03A9F4')
            .setDescription(`Niveau de maitrise sur le champion : ${champion}`)
            .addField('Niveau maitrise', championLevel, true)
            .addField('Points obtenus', championPoints, true)
            .addField('Joué pour la dernière fois', (new Date(lastPlayTime)).toLocaleString(), false)
            .setThumbnail(`https://cdn.communitydragon.org/11.1.1/champion/${championId}/tile`)
            .setTimestamp()
            .setFooter(message.author.username);
    
        message.channel.send(embed);
    } catch (err) {
        console.log(err);
        if (err.statusCode === 404) {
            return message.channel.send(`L'invocateur ${summoner} n'existe pas`);
        } else if (err.statusCode === 403) {
            return message.channel.send(`Le champion ${champion} n'existe pas`);
        } else {
            return message.channel.send(err.message);
        }
    }
}

module.exports.help = {
    aliases: ['getmastery', 'gmastonchamp'],
    args: true,
    cooldown: 10,
    description: "Informations relatives sur un champion particulier",
    isUserAdmin: false,
    name: 'getmasteryforchamp',
    permissions: false,
    usage: '<player_name> <champion_name>'
}