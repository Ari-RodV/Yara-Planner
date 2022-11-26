module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot || !message.content.startsWith(process.env.PREFIX)) return

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/)
    const cmd = args?.shift()?.toLowerCase()

    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases.inlcudes(cmd))

    if (command) {
        if (command.owner) {
            const owners = process.env.OWNER_IDS.split(' ')

            if (!owners.includes(message.author.id))
                return message.reply( {
                    content: `❌ **Only the owner(s) of this bot can execute this command**
                    \nOwner(s): ${owners.map(owner =>
                        `<@${owner}>`
                    ).join(', ')}`
                })
        }
        if (command.botPermissions) {
            if (!interactions.guild.members.me.permissions.has(command.botPermissions))
                return message.reply( {
                    content: `**I need the following permits to execute this command**
                    \n${command.botPermissions.map(permission =>
                        `/${permission}/`
                    ).join(', ')}`
                })
        }
        if (command.permissions) {
            if (!interactions.guild.members.permissions.has(command.permissions))
                return message.reply( {
                    content: `**You need the following permissions to execute this command**
                    \n${command.permissions.map(permission =>
                        `/${permission}/`
                    ).join(', ')}`
                })
        }

        try {
            command.execute(client, message, args, process.env.PREFIX)
        }
        catch (ex) {
            message.reply({
                content: `**Ther's been an error trying to run this command**`
            })
            console.log(ex)
            return
        }
    }
}