const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot-info')
		.setDescription('Display info about the bot'),
	async execute(interaction) {

		// Format Uptime
		let uptime = process.uptime()
		const days = Math.floor(uptime / 86400);
		uptime -= days * 86400;
		const hours = Math.floor(uptime / 3600) % 24;
		uptime -= hours * 3600;
		const minutes = Math.floor(uptime / 60) % 60;
		uptime -= minutes * 60;
		const seconds = Math.floor(uptime % 60)
		if (days) {
			uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
		} else if (hours) {
			uptime = `${hours} hours, ${minutes} minutes, ${seconds} seconds`
		} else if (minutes) {
			uptime = `${minutes} minutes, ${seconds} seconds`
		} else if (seconds) {
			uptime = `${seconds} seconds`
		} else {
			uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
		}

		// Buttons
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setURL('https://github.com/TolleyLikesRice/Nezz')
					.setLabel('GitHub')
					.setStyle('LINK'),
			);

		// Make + Send Embed
		const embed = new MessageEmbed()
			.setTitle("Nezz")
			.setColor('#184c46')
			.setThumbnail('https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png')
			.addFields(
				{ name: 'Version', value: require('../package.json').version, inline: true },
				{ name: 'Guilds', value: `${interaction.client.guilds.cache.size || "Unknown"}`, inline: true },
				{ name: 'Library', value: 'discord.js', inline: true },
				{ name: 'Memory Usage', value: `${Math.ceil(process.memoryUsage().heapUsed / 1048576)} MB`, inline: true },
				{ name: 'Uptime', value: `${uptime}` },
			)
			.setTimestamp()
			.setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });
		return interaction.reply({ embeds: [embed], components: [row] });
	},
};
