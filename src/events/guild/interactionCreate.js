module.exports = async (client, interaction) => {
    if (!interaction.guild || !interaction.channel) return

    const command = client.slashCommands.get(interaction?.commandName)
   

    if (command) {
        if (command.OWNER) {
            const owners = process.env.OWNER_IDS.split(' ')

            if (!owners.includes(interaction.user.id))
                return interaction.reply( {
                    content: `❌ **Only the owner(s) of this bot can execute this command:**
                    \nOwner(s): ${owners.map(owner =>
                        `<@${owner}>`
                    ).join(', ')}`
                })
        }
        if (command.BOT_PERMISSIONS) {
            if (!interactions.guild.members.me.permissions.has(command.BOT_PERMISSIONS))
                return interaction.reply( {
                    content: `**I need the following permits to execute this command:**
                    \n${command.BOT_PERMISSIONS.map(permission =>
                        `/${permission}/`
                    ).join(', ')}`
                })
        }
        if (command.PERMISSIONS) {
            if (!interactions.guild.members.permissions.has(command.PERMISSIONS))
                return interaction.reply( {
                    content: `**You need the following permissions to execute this command:**
                    \n${command.PERMISSIONS.map(permission =>
                        `/${permission}/`
                    ).join(', ')}`
                })
        }
        if (command.ROLES) {
            if (!interaction.member.roles.cache.find(x =>  command.ROLES.includes(x.name)))
            return interaction.reply( {
                content: `**You need one of the following roles to execute this command:**
                \n${command.ROLES.map(role =>
                    `/${role}/`
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