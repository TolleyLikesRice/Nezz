const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'f1');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f1')
        .setDescription('F1 Commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('championship')
                .setDescription('Show the current drivers championship standings'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('constructors')
                .setDescription('Show the current constructors championship standings'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('calender')
                .setDescription('Show the F1 calender')),
    async execute(interaction) {
        const year = new Date().getFullYear();
        switch (interaction.options.getSubcommand()) {
        case 'championship':
            axios({ url: `http://ergast.com/api/f1/${year}/driverStandings.json`, headers: { 'Accept': 'application/json', 'User-Agent': 'nezz' } })
                .then(res => {
                    let embed = new MessageEmbed()
                        .setTitle(`F1 Drivers Championship ${year} (as of Round ${res.data.MRData.StandingsTable.StandingsLists[0].round})`)
                        .setColor('#184c46')
                        .setTimestamp()
                        .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });

                    res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(position => {
                        embed = embed.addField(`#${position.position} - ${position.Driver.familyName}`, `${position.points}pts`);
                    });
                    interaction.reply({ embeds: [embed] });
                }); break;
        case 'constructors':
            axios({ url: `http://ergast.com/api/f1/${year}/constructorStandings.json`, headers: { 'Accept': 'application/json', 'User-Agent': 'nezz' } })
                .then(res => {
                    let embed = new MessageEmbed()
                        .setTitle(`F1 Constructors Championship ${year} (as of Round ${res.data.MRData.StandingsTable.StandingsLists[0].round})`)
                        .setColor('#184c46')
                        .setTimestamp()
                        .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });

                    res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.forEach(position => {
                        embed = embed.addField(`#${position.position} - ${position.Constructor.name}`, `${position.points}pts`);
                    });
                    interaction.reply({ embeds: [embed] });
                }); break;
        case 'calender':
            axios({ url: 'http://ergast.com/api/f1/current.json', headers: { 'Accept': 'application/json', 'User-Agent': 'nezz' } })
                .then(res => {
                    let embed = new MessageEmbed()
                        .setTitle(`F1 Calender ${res.data.MRData.RaceTable.season}`)
                        .setColor('#184c46')
                        .setTimestamp()
                        .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });

                    res.data.MRData.RaceTable.Races.forEach(race => {
                        embed = embed.addField(`#${race.round} - ${race.raceName}`, `${race.date} - ${race.Circuit.circuitName}`);
                    });
                    interaction.reply({ embeds: [embed] });
                });
        }

    },
};