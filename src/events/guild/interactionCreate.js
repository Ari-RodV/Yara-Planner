module.exports = async (client, interaction) => {
    if (!interaction.guild || !interaction.channel) return

    const command = client.slashCommands.get(interaction?.commandName)

    if (command) {
        if (command.owner) {
            const owners = process.env.OWNER_IDS.split(' ')

            if (!owners.includes(interaction.user.id))
                return interaction.reply( {
                    content: `❌ **Only the owner(s) of this bot can execute this command**
                    \nOwner(s): ${owners.map(owner =>
                        `<@${owner}>`
                    ).join(', ')}`
                })
        }
        if (command.botPermissions) {
            if (!interactions.guild.members.me.permissions.has(command.botPermissions))
                return interaction.reply( {
                    content: `**I need the following permits to execute this command**
                    \n${command.botPermissions.map(permission =>
                        `/${permission}/`
                    ).join(', ')}`
                })
        }
        if (command.permissions) {
            if (!interactions.guild.members.permissions.has(command.permissions))
                return interaction.reply( {
                    content: `**You need the following permissions to execute this command**
                    \n${command.permissions.map(permission =>
                        `/${permission}/`
                    ).join(', ')}`
                })
        }

        try {
            command.execute(client, interaction, '/')
        }
        catch (ex) {
            interaction.reply({
                content: `**Ther's been an error trying to run this command**`
            })
            console.log(ex)
            return
        }
    }
}