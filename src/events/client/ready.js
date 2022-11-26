module.exports = client => {
    console.log(`Session started as ${client.user.tag}`)

    if (client?.application?.commands) {
        client.application.commands.set(client.slashArray)
        console.log(`(/) ${client.slashCommands.size} commands published`)
    }
}