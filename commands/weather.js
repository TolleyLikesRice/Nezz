const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const moment = require('moment-timezone');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the current weather!')
        .addStringOption(option =>
            option.setName('location')
                .setDescription('Location')
                .setRequired(true)),
    async execute(interaction) {
        let location = interaction.options.getString('location');

        // Convert location into Long/Lat
        axios({ url: `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.WEATHERKEY}`, headers: { 'Accept': 'text/plain', 'User-Agent': 'nezz' } })
            .then(res => {
                if (res.data.length == 0) return interaction.reply({ content: 'Location could not be found', ephemeral: true });
                location = res.data[0];

                // Get weather
                axios({ url: `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,daily,hourly&appid=${process.env.WEATHERKEY}`, headers: { 'Accept': 'text/plain', 'User-Agent': 'nezz' } })
                    .then(res2 => {
                        const data = res2.data.current;

                        // Calculate Strip Colour
                        let colour = '#184c46';
                        const icon = data.weather[0].icon;
                        if (icon.includes('n')) colour = '#212121';
                        else if (icon.includes('01')) colour = '#ffee00';
                        else if (icon.includes('02')) colour = '#fff9a6';
                        else if (icon.includes('03')) colour = '#c9c9c9';
                        else if (icon.includes('04')) colour = '#8c8c8c';
                        else if (icon.includes('09')) colour = '#c4d3df';
                        else if (icon.includes('10')) colour = '#006cc4';
                        else if (icon.includes('11')) colour = '#383838';
                        else if (icon.includes('13')) colour = '#ffffff';
                        else if (icon.includes('50')) colour = '#b5b5b5';

                        // Convert temps from K to C
                        const temp = data.temp - 273.15;
                        const feelslike = data.feels_like - 273.15;

                        // Sunset/Sunrise in local time
                        const sunrise = moment.utc(data.sunrise * 1000).tz(res2.data.timezone).format('HH:mm z');
                        const sunset = moment.utc(data.sunset * 1000).tz(res2.data.timezone).format('HH:mm z');

                        // Form Embed
                        const embed = new MessageEmbed()
                            .setTitle(`Weather for ${location.name}`)
                            .setThumbnail(`http://openweathermap.org/img/wn/${icon}@2x.png`)
                            .addFields(
                                { name: 'Latitude', value: res2.data.lat.toString(), inline: true },
                                { name: 'Longitude', value: res2.data.lon.toString(), inline: true },
                                { name: '\u200b', value: '\u200b', inline: true },
                                { name: 'Temperature', value: `${(Math.round((temp + Number.EPSILON) * 100) / 100).toString()} °C`, inline: true },
                                { name: 'Feels Like', value: `${(Math.round((feelslike + Number.EPSILON) * 100) / 100).toString()} °C`, inline: true },
                                { name: '\u200b', value: '\u200b', inline: true },
                                { name: 'Wind Speed', value: `${data.wind_speed.toString()} m/s`, inline: true },
                                { name: 'Wind Direction', value: `${data.wind_deg.toString()}°`, inline: true },
                                { name: '\u200b', value: '\u200b', inline: true },
                                { name: 'Sunrise', value: sunrise, inline: true },
                                { name: 'Sunset', value: sunset, inline: true },
                                { name: '\u200b', value: '\u200b', inline: true },
                                { name: 'Humidity', value: `${data.humidity.toString()}%`, inline: true },
                            )
                            .setColor(colour)
                            .setTimestamp()
                            .setFooter({ text: 'Nezz', iconURL: 'https://github.com/TolleyLikesRice/Nezz/raw/main/assets/icon-256.png' });
                        interaction.reply({ embeds: [embed] });

                    })
                    .catch(err => {
                        console.log('Error: ', err.message);
                    });
            })
            .catch(err => {
                console.log('Error: ', err.message);
            });
    },
};