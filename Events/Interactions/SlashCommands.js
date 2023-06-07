const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name:"interactionCreate",
    execute(interaction, client){
        if(!interaction.isChatInputCommand()) return;
        
        const command = client.commands.get(interaction.commandName);
        if(!command)
        return interaction.reply({
            content: "This command is outdated.",
            ephemeral :true
        });

        if(command.developper && interaction.user.id !== "436462668354682881")
        return interaction.reply({
                content:"This command is only for Sank",
                ephemeral :true
            });
        command.execute(interaction,client);
    }
}