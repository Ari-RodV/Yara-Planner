module.exports = {
    DESCRIPTION: 'To get bot\'s ping',
    OWNER: true,
    async execute(client, message, args, prefix) { 
        return message.reply(`${client.ws.ping}ms`)
    },
}