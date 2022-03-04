const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Information about a given user or yourself')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to get the info about')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        // Force Fetch (up-to-date info, and for banner)
        await user.fetch(true);

        // Buttons
        let row = new MessageActionRow();

        const avatarURL = user.avatarURL();
        if (avatarURL) {
            row = row.addComponents(
                new MessageButton()
                    .setURL(avatarURL)
                    .setLabel('Avatar URL')
                    .setStyle('LINK'),
            );
        }


        const bannerURL = user.bannerURL();
        if (bannerURL) {
            row = row.addComponents(
                new MessageButton()
                    .setURL(bannerURL)
                    .setLabel('Banner URL')
                    .setStyle('LINK'),
            );
        }

        // Account Age
        const t = new Date().getTime() - user.createdAt.getTime();

        let age = t / (1000 * 3600 * 24);
        const years = Math.floor(age / 365);
        const months = Math.floor(age % 365 / 30);
        const days = Math.floor(age % 365 % 30);
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


        // Make + Send Embed
        const embed = new MessageEmbed()
            .setTitle(`User Info for ${user.tag}`)
            .setThumbnail(user.avatarURL())
            .addFields(
                { name: 'ID', value: user.id, inline: true },
                { name: 'Creation Date', value: user.createdAt.toISOString().split('T')[0], inline: true },
                { name: 'Account Age', value: age, inline: true },
            )
            .setColor('#184c46')
            .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });

        if (avatarURL || bannerURL) return interaction.reply({ embeds: [embed], components: [row] });
        return interaction.reply({ embeds: [embed] });
    },
};
