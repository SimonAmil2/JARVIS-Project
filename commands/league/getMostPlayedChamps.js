const { kayn } = require('../../utils/kaynConfig');
const { getMostPlayedChamps } = require('../../utils/leagueUtils');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const summoner = args[0];

    try {
        const {
            id: summonerID,
            summonerLevel,
            profileIconId
        } = await kayn.Summoner.by.name(summoner);

        const scores = await getMostPlayedChamps(summonerID);
        const embed = new MessageEmbed()
            .setAuthor(`${summoner} (Lvl. ${summonerLevel})`)
            .setColor('#03A9F4')
            .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`)
            .setDescription('Top 3 most played champs')
            .addFields(
                { name: 'Champion', value: scores[0].name, inline: true },
                { name: 'Points' , value: scores[0].points, inline: true },
                { name: 'Niveau', value: scores[0].level, inline: true }
            )
            .addFields(
                { name: 'Champion', value: scores[1].name, inline: true },
                { name: 'Points' , value: scores[1].points, inline: true },
                { name: 'Niveau', value: scores[1].level, inline: true }
            )            
            .addFields(
                { name: 'Champion', value: scores[2].name, inline: true },
                { name: 'Points' , value: scores[2].points, inline: true },
                { name: 'Niveau', value: scores[2].level, inline: true }
            )
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
    aliases: ['getmostplayedchamps', 'gettop3'],
    args: true,
    cooldown: 10,
    description: "Retourne les 3 champions les plus joués",
    isUserAdmin: false,
    name: 'getmostplayedchamps',
    permissions: false,
    usage: '<player_name>'
}