const { Collection, Client, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus } = require('discord.js')
const BotUtils = require('./Utils')

module.exports = class extends Client {
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildEmojisAndStickers,
        ],
        partials : [
            Partials.User,
            Partials.Channel,
            Partials.GuildMember,
            Partials.Message,
            Partials.Reaction,
        ],
        allowedMentions: {
            parse: ['roles', 'users'],
            replieduser: true,
        },
        presence:{ 
            activities: [
                {
                    name: process.env.STATUS,
                    type: ActivityType[process.env.STATUS_TYPE],
                },
            ],
            status: PresenceUpdateStatus.Online,
        },
    })
    {
        super({
            ...options
        })

        this.commands = new Collection()
        this.slashCommands = new Collection()
        this.slashArray = []

        this.utils = new BotUtils(this)
        this.start()
    }
    async start() {
        await this.loadHandlers()
        await this.loadEvents()
        await this.loadCommands()
        await this.loadSlashCommands()

        this.login(process.env.APP_TOKEN)
    }
    async loadCommands() {
        console.log(`(${process.env.PREFIX}) Loading commands`)
        this.commands.clear()

        const filesRoute = await this.utils.loadFiles('/src/commands')
        if (filesRoute.length) {
            filesRoute.forEach(fileRoute => {
                try {
                    const command = require(fileRoute)
                    const commandName = fileRoute.split('\\').pop().split('/').pop().split('.')[0]
                    command.name = commandName

                    if (commandName) this.commands.set(commandName, command)
                } catch (ex) {
                    console.log(`Error loading file: ${fileRoute}`);
                    console.log(ex)
                }
            }) 
        }
        console.log(`(${process.env.PREFIX}) ${this.commands.size} commands loaded`)
    }
    async loadSlashCommands() {
        console.log(`(/) Loading commands`)

        await this.slashCommands.clear()
        this.slashArray = []

        const filesRoute = await this.utils.loadFiles('/src/slashCommands')
        if (filesRoute.length) {
            filesRoute.forEach(fileRoute => {
                try {
                    const command = require(fileRoute)
                    const commandName = fileRoute.split('\\').pop().split('/').pop().split('.')[0]
                    command.CMD.name = commandName

                    if (commandName) {
                        this.slashCommands.set(commandName, command)
                        this.slashArray.push(command.CMD.toJSON())
                    }

                } catch (ex) {
                    console.log(`Error loading file: ${fileRoute}`);
                    console.log(ex)
                }
            }) 
        }
        console.log(`(/) ${this.slashCommands.size} commands loaded`)

        if (this?.application?.commands) {
            this.application.commands.set(this.slashArray)
            console.log(`(/) ${this.slashCommands.size} commands published`)
        }
    }
    async loadHandlers() {
        console.log(`(-) Loading commands`)

        const filesRoute = await this.utils.loadFiles('/src/handlers')
        if (filesRoute.length) {
            filesRoute.forEach(fileRoute => {
                try {
                    require(fileRoute)(this)
                } catch (ex) {
                    console.log(`Error loading file: ${fileRoute}`);
                    console.log(ex)
                }
            }) 
        }
        console.log(`(-) ${filesRoute.length} handlers loaded`)
    }
    async loadEvents() {
        console.log(`(+) Loading events`)
        const filesRoute = await this.utils.loadFiles('/src/events')
        this.removeAllListeners()

        if (filesRoute.length) {
            filesRoute.forEach(fileRoute => {
                try {
                    const event = require(fileRoute)
                    const eventName = fileRoute.split('\\').pop().split('/').pop().split('.')[0]
                    this.on(eventName, event.bind(null, this))
                } catch (ex) {
                    console.log(`Error loading file: ${fileRoute}`);
                    console.log(ex)
                }
            }) 
        }
        console.log(`(+) ${filesRoute.length} events loaded`)
    }
}