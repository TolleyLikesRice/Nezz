const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vc')
        .setDescription('VC Managment Commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('muteall')
                .setDescription('Mutes everyone in a voice channel')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('Target Channel')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('unmuteall')
                .setDescription('Unmutes everyone in a voice channel')
                .addChannelOption(option =>
                    option.setName('channel')
                        .setDescription('Target Channel')
                        .setRequired(true))),
    async execute(interaction) {
        const vc = interaction.options.getChannel('channel');
        if (!vc.isVoice()) return interaction.reply({ content: 'Not a voice channel', ephemeral: true });

        if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) return interaction.reply({ content: 'You need the `Mute Members` permission to do this', ephemeral: true });

        const muted = [];
        switch (interaction.options.getSubcommand()) {
        case 'muteall':
            for (let i = 0; i < vc.members.size; i++) {
                const member = vc.members.at(i);
                member.voice.setMute(true, '/vc muteall command');
                muted.push(member.user.username);
            }
            interaction.reply(`Muted: ${muted.join(', ')}`);
            break;
        case 'unmuteall':
            for (let i = 0; i < vc.members.size; i++) {
                const member = vc.members.at(i);
                member.voice.setMute(false, '/vc unmuteall command');
                muted.push(member.user.username);
            }
            interaction.reply(`Unmuted: ${muted.join(', ')}`);
        }

    },
};