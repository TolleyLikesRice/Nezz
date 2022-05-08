const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'convert-currency');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('convert-currency')
        .setDescription('Convert currency (who would\'ve guessed)')
        .addStringOption(option =>
            option.setName('from')
                .setDescription('Currency to convert from')
                .setRequired(true)
                .addChoice('USD', 'USD')
                .addChoice('EUR', 'EUR')
                .addChoice('JPY', 'JPY')
                .addChoice('GBP', 'GBP')
                .addChoice('AUD', 'AUD')
                .addChoice('CAD', 'CAD')
                .addChoice('CHF', 'CHF')
                .addChoice('CNY', 'CNY')
                .addChoice('HKD', 'HKD')
                .addChoice('NZD', 'NZD')
                .addChoice('SEK', 'SEK')
                .addChoice('KRW', 'KRW')
                .addChoice('SGD', 'SGD')
                .addChoice('NOK', 'NOK')
                .addChoice('MXN', 'MXN')
                .addChoice('INR', 'INR')
                .addChoice('RUB', 'RUB')
                .addChoice('ZAR', 'ZAR')
                .addChoice('TRY', 'TRY')
                .addChoice('BRL', 'BRL'))
        .addStringOption(option =>
            option.setName('to')
                .setDescription('Currency to convert to')
                .setRequired(true)
                .addChoice('USD', 'USD')
                .addChoice('EUR', 'EUR')
                .addChoice('JPY', 'JPY')
                .addChoice('GBP', 'GBP')
                .addChoice('AUD', 'AUD')
                .addChoice('CAD', 'CAD')
                .addChoice('CHF', 'CHF')
                .addChoice('CNY', 'CNY')
                .addChoice('HKD', 'HKD')
                .addChoice('NZD', 'NZD')
                .addChoice('SEK', 'SEK')
                .addChoice('KRW', 'KRW')
                .addChoice('SGD', 'SGD')
                .addChoice('NOK', 'NOK')
                .addChoice('MXN', 'MXN')
                .addChoice('INR', 'INR')
                .addChoice('RUB', 'RUB')
                .addChoice('ZAR', 'ZAR')
                .addChoice('TRY', 'TRY')
                .addChoice('BRL', 'BRL'))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount to convert')
                .setRequired(true)),
    async execute(interaction) {
        const from = interaction.options.getString('from');
        const to = interaction.options.getString('to');
        const amount = interaction.options.getNumber('amount');
        axios({ url: `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`, headers: { 'User-Agent': 'nezz' } })
            .then(res => {
                interaction.reply(`${amount} ${from} is ${Math.round((res.data.result + Number.EPSILON) * 100) / 100} ${to}`);
            })
            .catch(err => {
                logger.error('Error: ', err.message);
            });
    },
};