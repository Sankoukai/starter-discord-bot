const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require("discord.js");
const { execute } = require("../../Events/Client/ready");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("Donne le nombre de membres sur SFF"),
    async execute(interaction,client){
        await interaction.guild.members.fetch()
        interaction.reply({content:`Total ${interaction.guild.members.cache.filter((member) => !member.user.bot).size}`, ephemeral: true});
    }
}