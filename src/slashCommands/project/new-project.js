const { SlashCommandBuilder } = require('discord.js')
const Project = require('../../models/project')

module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('To create a new project')
        .addStringOption(option =>
            option.setName('name')
            .setDescription('Create a name for your proyect.')
            .setRequired(true)
        ),
    ROLES: ['Board'],
    async execute(client, interaction, prefix) {
        const name = interaction.options.getString('name')
        const userId = interaction.user.id
        
        const projects = await Project.find({ userId, name, })

        if (projects.length) {
            return interaction.reply(
                `The project ${name} already exist`
            )
        }

        if (name.lenght > 20) {
            return interaction.reply(
                `Projects can hava a max of 20 characters`
            )
        }

        const project = new Project({ userId, name, })

        project.save((ex, result) => {
            if (ex) {
                console.log('Error')
                console.log(ex)
                return interaction.reply(
                    `There was an error saving the project ${name}`
                )
            }
            else {
                return interaction.reply(
                    `The project ${result.name} was saved succesfully`
                )
            }
        })
    },
}