const { kayn } = require('./kaynConfig');

const getSoloQueue = (q1, q2) => {
    return q1['queueType'] === 'RANKED_SOLO_5x5' ? q1 : q2;
}

const getFlexQueue = (q1, q2) => {
    return q1['queueType'] === 'RANKED_FLEX_SR' ? q1 : q2;
}

const getChampName = (id, data) => {
    for (let i in data) {
        if (data[i].key == id) return data[i].name;
    }
}

const getSoloStats = async (summonerId) => {
    const [ queue1, queue2 ] = await kayn.League.Entries.by.summonerID(summonerId);
    if (!queue1 && !queue2) return { soloRank: 'Unranked', soloRatio: 'NA' };
    const solo = getSoloQueue(queue1, queue2);

    const soloRank = solo ? `${solo.tier} ${solo.rank} (${solo.leaguePoints} LP)` : 'Unranked';
    const soloRatio = solo ? `${Math.floor((solo.wins/(solo.wins + solo.losses))*100)}% (${solo.wins}W/${solo.losses}L)` : 'NA';

    return {
        soloRank,
        soloRatio,
    }
}

const getRankedStats = async (summonerId) => {
    const [ queue1, queue2 ] = await kayn.League.Entries.by.summonerID(summonerId);
    const solo = getSoloQueue(queue1, queue2);
    const flex = getFlexQueue(queue1, queue2);

    const soloRank = solo ? `${solo.tier} ${solo.rank} (${solo.leaguePoints} LP) \n` : 'Unranked';
    const soloRatio = solo ? `${Math.floor((solo.wins/(solo.wins + solo.losses))*100)}% (${solo.wins}W/${solo.losses}L)` : 'NA';
    const soloBo = solo && solo.miniSeries ? `Résultat BO : **${solo.miniSeries.progress.split('').join(' ')}**` : 'Not in BO';

    const flexRank = flex ? `${flex.tier} ${flex.rank} (${flex.leaguePoints} LP) \n` : 'Unranked';
    const flexRatio = flex ? `${Math.floor((flex.wins/(flex.wins + flex.losses))*100)}% (${flex.wins}W/${flex.losses}L)` : 'NA';
    const flexBo = flex && flex.miniSeries ? `Résultat BO : **${flex.miniSeries.progress.split('').join(' ')}**` : 'Not in BO';

    return {
        soloRank,
        soloRatio,
        soloBo,
        flexRank,
        flexRatio,
        flexBo
    }
}

const getMostPlayedChamps = async (summonerId) => {
    // Champions Name from DD
    const { data: champions } = await kayn.DDragon.Champion.list();
    const [first, second, third] = await kayn.ChampionMastery.list(summonerId);
    
    let mostPlayedChampsIds = [first, second, third].map(chp => chp.championId);
    const getChpMstyFromSumm = kayn.ChampionMastery.get(summonerId);
    const requests = mostPlayedChampsIds.map(getChpMstyFromSumm);
    const result = await Promise.all(requests);

    return result.map(chp => {
        return {
            id: chp.championId,
            name: getChampName(chp.championId, champions),
            points: chp.championPoints,
            level: chp.championLevel
        }
    });
}

const getMasteryForChamp = async (champion, summonerId) => {
    const { data: { [champion]: { key } } } = await kayn.DDragon.Champion.get(champion);
    console.log(key);

    const getChampionMasteryFromSummoner = kayn.ChampionMastery.get(summonerId);
    const req = getChampionMasteryFromSummoner(key);

    return await Promise.resolve(req);
}

const getGameInfo = async (summonerId) => {
    const { participants } = await kayn.CurrentGame.by.summonerID(summonerId);
    const teamA = await Promise.all(participants.slice(0, 5).map(async (summoner) => {
        const { soloRank, soloRatio } = await getSoloStats(summoner.summonerId);
        return {
            name: summoner.summonerName,
            soloRank,
            soloRatio
        }
    }));
    const teamB = await Promise.all(participants.slice(5, 10).map(async (summoner) => {
        const { soloRank, soloRatio } = await getSoloStats(summoner.summonerId);
        return {
            name: summoner.summonerName,
            soloRank,
            soloRatio
        }
    }));
    return [teamA, teamB];
}

module.exports = {
    getSoloStats,
    getRankedStats,
    getMostPlayedChamps,
    getMasteryForChamp,
    getGameInfo
}