require('dotenv').config()
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js')

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.once('ready', () => {
    console.log('Yara planner is ready!');

    client.user.setActivity('Create yout plans!', { type: 'WATCHING' })
})

client.login(process.env.APP_TOKEN)