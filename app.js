/* eslint-disable brace-style */
const fs = require('node:fs');
const { Client, Collection, Intents, Message, MessageEmbed } = require('discord.js');
const tsjl = require('tsjl-node');
const logger = new tsjl.Logger('nezz', 'app');
const axios = require('axios').default;
require('dotenv').config();

const client = new Client({ intents: ['GUILD_MEMBERS'] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    }
    catch (error) {
        logger.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


/* Creating a new file for each guild when the bot joins. */
client.on('guildCreate', guild => {
    const file_path = './data/guilds/' + guild.id + '.json';
    logger.debug('Creating new guild file for ' + guild.name);

    // create a new file or use sql
    fs.writeFile(file_path, JSON.stringify({
        welcomeChannel: '',
        welcomeTitle: '',
        welcomeMessage: '',
        welcomeEnabled: false,
        leaveChannel: '',
        leaveTitle: '',
        leaveMessage: '',
        leaveEnabled: false,

    }, null, '\t'), (err) => {
        if (err) throw err;
        logger.debug('The file has been saved!');
    });
});


/* Deleting the guild file when the bot leaves the guild. */
client.on('guildDelete', guild => {

    const file_path = './data/guilds/' + guild.id + '.json';

    fs.unlink(file_path, (err) => {
        if (err) throw err;
        logger.debug('File deleted!');
    });
});

client.login(process.env.TOKEN);
