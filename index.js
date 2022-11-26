require('dotenv').config()
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js')
const mongoose = require('mongoose')

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })



client.once('ready', () => {
    console.log('Yara planner is ready!');

    client.user.setActivity('Create yout plans!', { type: 'WATCHING' })
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eb27ski.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}). then(() => {
    console.log('Connected to database')
}).catch(() => {
    console.log('Error connecting to database');
})

client.login(process.env.APP_TOKEN)