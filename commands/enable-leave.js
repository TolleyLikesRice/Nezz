const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('enable-leave')
        .setDescription('Bot settings')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the left message to')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('The embed title')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to send')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('enable-message')
                .setDescription('Whether or not to send the left message')
                .setRequired(true)),
    async execute(interaction) {

        let guild = interaction.guild;

        //update file
        let guildSettings = JSON.parse(fs.readFileSync('./data/guilds/' + guild.id + '.json', 'utf8'));
        guildSettings.leaveChannel = interaction.options.getChannel('channel').id;
        guildSettings.leaveTitle = interaction.options.getString('title');
        guildSettings.leaveMessage = interaction.options.getString('message');
        guildSettings.leaveEnabled = interaction.options.getBoolean('enable-message');
        console.log(guildSettings);
        //overwrite file
        fs.writeFile('./data/guilds/' + guild.id + '.json', JSON.stringify(guildSettings, null, '\t'), (err) => {
            if (err) {
                console.log(err);
            }
        });
        interaction.reply('Settings updated!');
    },
};