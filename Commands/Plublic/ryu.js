const { ChatInputCommandInteraction, SlashCommandBuilder, Client } = require("discord.js");
const { execute } = require("../../Events/Client/ready");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ryu")
    .setDescription("Donne la liste des joueurs de Ryu en ligne"),
    async execute(interaction,client){
        await interaction.guild.members.fetch()
    
        await interaction.reply({content:`Joueurs de Ryu en ligne:\n ${interaction.guild.members.cache.filter((member) => 
    
             member.roles.cache.some(role => role.name === '🥋 Ryu') &&
             member.presence !== null
            
        ).map(member => member.user).join("\n ")}`, ephemeral: true});
    }
}