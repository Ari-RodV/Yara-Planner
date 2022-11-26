require('dotenv').config()

const Bot = require('./structures/client')
new Bot()

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eb27ski.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}). then(() => {
    console.log('Connected to database')
}).catch(() => {
    console.log('Error connecting to database');
})
