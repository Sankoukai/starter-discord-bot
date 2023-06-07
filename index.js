const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 
const express = require('express');
const app = express();
const {Client,Partials, Collection} = require('discord.js');
const {User, Message, GuildMember, ThreadMembers} = Partials
const client = new Client({
    intents:[3276799],
    partials:[User, Message, GuildMember, ThreadMembers]
});

client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.memberGuildConfig = new Collection();
client.messageGuildConfig = new Collection();

console.log(`const loadEvents !!`);
const { loadEvents } = require("./Handlers/eventHandler");
console.log(`const loadCommands !!`);
const { loadCommands } = require('./Handlers/commandHandler');


client.login(TOKEN);
app.get('/launch', async (req,res) =>{
  try{
    console.log(`const loadEvents !!`);
    loadEvents(client);
    console.log(`client  ${client} client !!`);
    return res.send('commands have been registered')
  }catch(e){
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e.code} error from discord`)
  }
})

app.listen(8999, () => {

})
