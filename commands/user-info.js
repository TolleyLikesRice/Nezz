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
        await user.fetch(true)

        // Buttons
        let row = new MessageActionRow()

        let avatarURL = user.avatarURL();
        if (avatarURL) {
            row = row.addComponents(
                new MessageButton()
                    .setURL(avatarURL)
                    .setLabel('Avatar URL')
                    .setStyle('LINK')
            )
        }

        
        let bannerURL = user.bannerURL();
        if (bannerURL) {
            row = row.addComponents(
                new MessageButton()
                    .setURL(bannerURL)
                    .setLabel('Banner URL')
                    .setStyle('LINK')
            )
        }

        // Account Age
        var t = new Date().getTime() - user.createdAt.getTime();

        var age = t / (1000 * 3600 * 24);
        var years = Math.floor(age / 365);
        var months = Math.floor(age % 365 / 30);
        var days = Math.floor(age % 365 % 30);
        if (years) {
            age = `${years} years, ${months} months, ${days} days`
        } else if (months) {
            age = `${months} months, ${days} days`
        } else if (days) {
            age = `${days} days`
        } else {
            age = `${years} years, ${months} months, ${days} days`
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
            .setColor('#0099ff')
            .setFooter({ text: 'Nezz by TolleyLikesRice', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon.png' });
        
        if (avatarURL || bannerURL) return interaction.reply({ embeds: [embed], components: [row] });
        return interaction.reply({ embeds: [embed] });;
    },
};
