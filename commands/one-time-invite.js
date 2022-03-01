const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('one-time-invite')
        .setDescription('Generate a single-use invite')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel the invite should point to')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('expiry')
                .setDescription('How long should the invite last')
                .setRequired(false)
                .addChoice('1h', 3600)
                .addChoice('12h', 43200)
                .addChoice('24h', 86400)
                .addChoice('1w', 604800)),
    async execute(interaction) {
        interaction.guild.invites.create(interaction.options.getChannel('channel') || interaction.channelId, { maxUses: 1, maxAge: interaction.options.getInteger('expiry') || 604800, unique: true })
            .then(invite => interaction.reply({ content: invite.toString(), ephemeral: true }))
    },
};