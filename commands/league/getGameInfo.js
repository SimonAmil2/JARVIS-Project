const { kayn } = require('../../utils/kaynConfig');
const { getGameInfo } = require('../../utils/leagueUtils');
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const summoner = args[0];

    try {
        const { id: summonerID } = await kayn.Summoner.by.name(summoner);
        const [ teamA, teamB ] = await getGameInfo(summonerID);

        const embed = new MessageEmbed()
        .setAuthor(`BLUE TEAM`)
        .setColor('#03A9F4')
        teamA.forEach(summoner => {
            embed.addFields({ name: `${summoner.name}`, value: `**${summoner.soloRank}** \t *${summoner.soloRatio}*`} );
        });
        message.channel.send(embed);

        const embed2 = new MessageEmbed()
        .setAuthor(`RED TEAM`)
        .setColor('#d32f2f')
        teamB.forEach(summoner => {
            embed2.addFields({ name: `${summoner.name}`, value: `**${summoner.soloRank}** \t *${summoner.soloRatio}*`} );
        });
        message.channel.send(embed2);
    
    } catch (err) {
        if (err.statusCode === 404) {
            return message.channel.send(`L'invocateur ${summoner} n'existe pas / n'est pas en game`);
        } else {
            return message.channel.send(err.message);
        }
    }
}

module.exports.help = {
    aliases: ['getgameinfo', 'ggameinf'],
    args: true,
    cooldown: 10,
    description: "Informations relatives sur une partie",
    isUserAdmin: false,
    name: 'getgameinfo',
    permissions: false,
    usage: '<player_name>'
}