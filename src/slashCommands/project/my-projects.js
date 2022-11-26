const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, } = require('discord.js');
const project = require('../../models/project');
const Project = require('../../models/project')

const Buttons = (projects) => {
    var buttons = []
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        buttons.push(
            new ButtonBuilder()
            .setCustomId(project.id)
            .setLabel(project.name)
            .setStyle(ButtonStyle.Primary)
        )
    }

    return buttons
}

const Builder = (projects) => {
    const arr = []

    for (let i = 0; i < projects.length; i += 3) {
        const buttonRow = projects.slice(i, i + 3)
        arr.push(new ActionRowBuilder().setComponents(Buttons(buttonRow)))
    }
   
    return arr
}

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('To check yorur existing proyects'),
    ROLES: ['Board'],
    async execute(client, interaction, prefix) {
        const userId = interaction.user.id
        const projects = await Project.find({ userId, })

        const m = await interaction.reply({
            content: `<@${userId}> Projects:`,
            components: Builder(projects),
        })

        const filter = i => i.user.id === userId

        const collector = m.createMessageComponentCollector({ filter, time: 15000 })

        collector.on('collect', async i => {
            await i.deferUpdate()
            
            const project = projects.find(x => x.id === i.customId)
            await i.editReply({ content: `Project ${project.name}, by <@${userId}>`, components: [] });
        })
    },
}