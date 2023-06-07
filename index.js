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
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');
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

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log(interaction.data.name)
    if(interaction.data.name == 'sffcount'){
      await interaction.guild.members.fetch()
      return res.send({
    
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
           data: {
              content: `Nombre de membres sur SFF: ${interaction.guild.members.cache.filter((member) => !member.user.bot).size}`,
          flags: 64,
            },
          });
    }
  }

})

app.get('/register_commands', async (req,res) =>{
  let slash_commands = [
    {
      "name": "sffcount",
      "description": "Retourne le nombre de membres SFF!",
      "options": []
    },
    /*{
      "name": "cammy",
      "description": "Retourne le nombre de cammy",
      "options": []
    },*/
    /*{
      "name": "dm",
      "description": "sends user a DM",
      "options": []
    }*/
  ]
  try
  {
    // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
    let discord_response = await discord_api.put(
      `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
      slash_commands
    )
    console.log(discord_response.data)
    return res.send('commands have been registered')
  }catch(e){
    console.error(e.code)
    console.error(e.response?.data)
    return res.send(`${e.code} error from discord`)
  }
})


app.get('/', async (req,res) =>{
  return res.send('Follow documentation ')
})


app.listen(8999, () => {

})