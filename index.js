const {Client,Partials, Collection} = require('discord.js');
const {User, Message, GuildMember, ThreadMembers} = Partials
const client = new Client({
    intents:[3276799],
    partials:[User, Message, GuildMember, ThreadMembers]
});

client.config = require("./config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();
client.memberGuildConfig = new Collection();
client.messageGuildConfig = new Collection();

const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require('./Handlers/commandHandler');

loadEvents(client);

client.login(client.config.token);