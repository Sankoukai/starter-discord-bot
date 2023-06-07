const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 

const {Client,Partials, Collection} = require('discord.js');
const {User, Message, GuildMember, ThreadMembers} = Partials
const client = new Client({
    intents:[3276799],
    partials:[User, Message, GuildMember, ThreadMembers]
});
const express = require('express');
const app = express();
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.memberGuildConfig = new Collection();
client.messageGuildConfig = new Collection();

console.log(`const loadEvents !!`);
const { loadEvents } = require("./Handlers/eventHandler");
console.log(`const loadCommands !!`);
const { loadCommands } = require('./Handlers/commandHandler');
console.log(`const loadEvents !!`);
loadEvents(client);
console.log(`client  ${client} client !!`);


app.get('/launch', async (req,res) =>{
  client.login(TOKEN);
  return res.send('launch ok')
}

app.listen(8999, () => {

})