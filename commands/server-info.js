const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Information about this server'),

    async execute(interaction) {
        const guild = interaction.guild;

        // Force Fetch
        await guild.fetch(true);

        // Server Age
        let t = new Date().getTime() - guild.createdAt.getTime();

        let age = t / (1000 * 3600 * 24);
        let years = Math.floor(age / 365);
        let months = Math.floor(age % 365 / 30);
        let days = Math.floor(age % 365 % 30);
        if (years) {
            age = `${years} years, ${months} months, ${days} days`;
        }
        else if (months) {
            age = `${months} months, ${days} days`;
        }
        else if (days) {
            age = `${days} days`;
        }
        else {
            age = `${years} years, ${months} months, ${days} days`;
        }

        // Bot in server time
        t = new Date().getTime() - guild.joinedAt.getTime();

        let inServer = t / (1000 * 3600 * 24);
        years = Math.floor(inServer / 365);
        months = Math.floor(inServer % 365 / 30);
        days = Math.floor(inServer % 365 % 30);
        if (years) {
            inServer = `${years} years, ${months} months, ${days} days`;
        }
        else if (months) {
            inServer = `${months} months, ${days} days`;
        }
        else if (days) {
            inServer = `${days} days`;
        }
        else {
            inServer = `${years} years, ${months} months, ${days} days`;
        }

        // Make + Send Embed
        const embed = new MessageEmbed()
            .setTitle(`Server Info for ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'ID', value: guild.id, inline: true },
                { name: 'Creation Date', value: guild.createdAt.toISOString().split('T')[0], inline: true },
                { name: 'Server Age', value: age, inline: true },
                { name: 'Members', value: guild.memberCount.toString(), inline: true },
                { name: 'Nezz joined', value: guild.joinedAt.toISOString().split('T')[0], inline: true },
                { name: 'Nezz has been here', value: inServer, inline: true },
            )
            .setColor('#184c46')
            .setTimestamp()
            .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });
        return interaction.reply({ embeds: [embed] });
    },
};
