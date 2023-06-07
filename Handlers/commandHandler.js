 const {loadFiles} = require("../Function/fileLoader");
    const ascii = require("ascii-table")
    const table = new ascii().setHeading("Commands","Status");

async function loadCommands(client){
   
    console.log(`loadCommands !!`)
    
    await client.commands.clear();

    let commandsArray = [];

    const Files = await loadFiles("Commands");

    Files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());
        
        table.addRow(command.data.name, "✅");
    });
    client.application.commands.set(commandsArray);
    return console.log(table.toString(), "\nCommands loaded");
}

module.exports = { loadCommands }