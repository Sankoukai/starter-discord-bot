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

client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.memberGuildConfig = new Collection();
client.messageGuildConfig = new Collection();



const app = express();

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require('./Handlers/commandHandler');

loadEvents(client);

client.login(TOKEN);