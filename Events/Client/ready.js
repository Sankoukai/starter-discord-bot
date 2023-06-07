const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute(client){
        loadCommands(client);
        client.user.setActivity('Street Fighter™ 6');
        console.log("Connected");
    }
}