
const APPLICATION_ID = process.env.APPLICATION_ID
const TOKEN = process.env.TOKEN
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID
const CHALLONGE_API_KEY = process.env.CHALLONGE_API_KEY
const CHALLONGE_USER_NAME = process.env.CHALLONGE_USER_NAME
const CHALLONGE_CLIENT_ID = process.env.CHALLONGE_CLIENT_ID
const CHALLONGE_CLIENT_SECRET = process.env.CHALLONGE_CLIENT_SECRET
const CHALLONGE_CLIENT_CODE = process.env.CHALLONGE_CLIENT_CODE

const OAUTH_ROOT_URL = "https://api.challonge.com"
const API_ROOT_URL   = "https://api.challonge.com/v2"


const util = require('util');
const axios = require('axios');
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const app = express();
// app.use(bodyParser.json());

const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 10000,
  headers: {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Authorization-Type",
  "Access-Control-Allow-Headers": "Authorization",
  "Authorization": `Bot ${TOKEN}`,
  }
});

const challonge_oauth_api = axios.create({
  baseURL: 'https://api.challonge.com',
  timeout: 3000,
  headers: {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Authorization-Type",
  "Access-Control-Allow-Headers": "Authorization",
  "Authorization": `Bot ${TOKEN}`,
  }
});

const slash_commands = [{
  "name": "sffcount",
  "description": "Retourne le nombre de membres SFF!",
  "options": []
},
{
  "name": "test",
  "description": "test",
  "options": []
},
{
  "name": "cammy",
  "description": "Retourne une liste de joueur jouant Cammy",
  "options": []
},
{
  "name": "deejay",
  "description": "Retourne une liste de joueur jouant Deejay",
  "options": []
},
{
  "name": "honda",
  "description": "Retourne une liste de joueur jouant Honda",
  "options": []
},
{
  "name": "ryu",
  "description": "Retourne une liste de joueur jouant Ryu",
  "options": []
},
{
  "name": "ken",
  "description": "Retourne une liste de joueur jouant Ken",
  "options": []
},
{
  "name": "guile",
  "description": "Retourne une liste de joueur jouant Guile",
  "options": []
},
{
  "name": "dhalsim",
  "description": "Retourne une liste de joueur jouant Dhalsim",
  "options": []
},
{
  "name": "chunli",
  "description": "Retourne une liste de joueur jouant Chunli",
  "options": []
},
{
  "name": "marisa",
  "description": "Retourne une liste de joueur jouant Marisa",
  "options": []
},
{
  "name": "manon",
  "description": "Retourne une liste de joueur jouant Manon",
  "options": []
},
{
  "name": "jamie",
  "description": "Retourne une liste de joueur jouant Jamie",
  "options": []
},
{
  "name": "kimberly",
  "description": "Retourne une liste de joueur jouant Kimberly",
  "options": []
},
 {
  "name": "luke",
  "description": "Retourne une liste de joueur jouant Luke",
  "options": []
},
{
  "name": "blanka",
  "description": "Retourne une liste de joueur jouant Blanka",
  "options": []
},
{
  "name": "juri",
  "description": "Retourne une liste de joueur jouant Juri",
  "options": []
},
{
  "name": "jp",
  "description": "Retourne une liste de joueur jouant Jp",
  "options": []
},
{
  "name": "lily",
  "description": "Retourne une liste de joueur jouant Lily",
  "options": []
},
{
  "name": "zangief",
  "description": "Retourne une liste de joueur jouant Zangief",
  "options": []
},
{
  "name": "sac",
  "description": "Retourne une liste de joueur niveau Sac",
  "options": []
},
{
  "name": "iron",
  "description": "Retourne une liste de joueur niveau Iron",
  "options": []
},
{
  "name": "bronze",
  "description": "Retourne une liste de joueur niveau Bronze",
  "options": []
},
{
  "name": "silver",
  "description": "Retourne une liste de joueur niveau Silver",
  "options": []
},
{
  "name": "gold",
  "description": "Retourne une liste de joueur niveau Gold",
  "options": []
},
{
  "name": "platinum",
  "description": "Retourne une liste de joueur niveau Platinum",
  "options": []
},
{
  "name": "diamond",
  "description": "Retourne une liste de joueur niveau Diamond",
  "options": []
},
{
  "name": "master",
  "description": "Retourne une liste de joueur niveau Master",
  "options": []
},
{
  "name": "sensei",
  "description": "Retourne une liste de Sensei",
  "options": []
},
];


async function sendMessageForSpecificRole(res,id){
  try{
     let response = (await discord_api.get(`/guilds/${GUILD_ID}/members?limit=1000`))
          return res.send({

          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
           data: {
              content: `${response.data.filter(
        (member) => {
          return member.roles.includes(id);
        })
       .map(
        (member) => `<@${member.user.id}>`

      )}`,
      flags: 64,
            },
          });
  }
      catch(e){
      console.log(`MY sendMessageForSpecificRole ERROR ${e}`)
      }
}

async function tournamentList(res,tournament){
  try{
    challonge_oauth_api.post(
      "/oauth/token",
      {
        client_secret:CHALLONGE_CLIENT_SECRET,
        client_id:CHALLONGE_CLIENT_ID,
        grant_type:"client_credentials",
        scope: 'me tournaments:read matches:read attachments:read participants:write stations:read application:manage'
      },
    ).then(responseee => {
      console.log(`ALORS1 ? ${util.inspect(responseee.data)}`)
          challonge_oauth_api.get("/v2/application/tournaments.json",{
            headers:{
              "Authorization-Type":"v2",
              'Authorization': 'Bearer ' +responseee.data.access_token,
              "Content-Type":"application/vnd.api+json",
              "Accept":"application/json"
            }
          }
        ).then(responsee => {
              console.log(`Tournaments ${util.inspect(responsee.data.data)}`)
              return res.send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
               data: {
                  content: `Tournois: ${responsee.data.data.map(tournoi => tournoi.id)}`,
                  flags: 64,
                },
              });
            })
      });


      }catch(e){
        console.log(`MY tournamentList ERROR ${e}`)
      }
}

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
   console.log(`${interaction.data.name} -- ${util.inspect(interaction.member)}`);
    if(interaction.data.name == 'sffcount'){
      try{
        let response = (await discord_api.get(`/guilds/${GUILD_ID}?with_counts=true`))
          return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
           data: {
              content: `Nombre de membres sur SFF: ${response.data.approximate_member_count} merci <@${interaction.member.user.id}>`,
              flags: 64,
            },
          });
        }
      catch(e){
        console.log(`MY ERROR ${e}`)
      }
    }
    if(interaction.data.name == 'test'){

    }
    if(interaction.data.name == 'cammy'){
      return sendMessageForSpecificRole(res,'1105040765186474015');
    }
    if(interaction.data.name == 'deejay'){
      return sendMessageForSpecificRole(res,'1105035482582233160');
    }
    if(interaction.data.name == 'honda'){
      return sendMessageForSpecificRole(res,'1105035703412330506');
    }
    if(interaction.data.name == 'ryu'){
      return sendMessageForSpecificRole(res,'1105035782735011902');
    }
    if(interaction.data.name == 'ken'){
      return sendMessageForSpecificRole(res,'1105035997705682974');
    }
    if(interaction.data.name == 'guile'){
      return sendMessageForSpecificRole(res,'1105036157554802688');
    }
    if(interaction.data.name == 'dhalsim'){
      return sendMessageForSpecificRole(res,'1105036320394457178');
    }
    if(interaction.data.name == 'chunli'){
      return sendMessageForSpecificRole(res,'1105037949990617129');
    }
    if(interaction.data.name == 'marisa'){
      return sendMessageForSpecificRole(res,'1105039025779261440');
    }
    if(interaction.data.name == 'manon'){
      return sendMessageForSpecificRole(res,'1105039198588776448');
    }
    if(interaction.data.name == 'jamie'){
      return sendMessageForSpecificRole(res,'1105039328834502739');
    }
    if(interaction.data.name == 'kimberly'){
      return sendMessageForSpecificRole(res,'1105039593235042355');
    }
    if(interaction.data.name == 'luke'){
      return sendMessageForSpecificRole(res,'1105039726815232020');
    }
    if(interaction.data.name == 'blanka'){
      return sendMessageForSpecificRole(res,'1105039877797580942');
    }
    if(interaction.data.name == 'juri'){
      return sendMessageForSpecificRole(res,'1105039968210001972');
    }
    if(interaction.data.name == 'jp'){
      return sendMessageForSpecificRole(res,'1105040328429420554');
    }
    if(interaction.data.name == 'lily'){
      return sendMessageForSpecificRole(res,'1105040908291952650');
    }
    if(interaction.data.name == 'zangief'){
      return sendMessageForSpecificRole(res,'1105041405753167922');
    }
    if(interaction.data.name == 'sac'){
      return sendMessageForSpecificRole(res,'1105071692302262373');
    }
    if(interaction.data.name == 'iron'){
      return sendMessageForSpecificRole(res,'1105067726998872106');
    }
    if(interaction.data.name == 'bronze'){
      return sendMessageForSpecificRole(res,'1105066053232513024');
    }
    if(interaction.data.name == 'silver'){
      return sendMessageForSpecificRole(res,'1105066125819125841');
    }
    if(interaction.data.name == 'gold'){
      return sendMessageForSpecificRole(res,'1105066437225218099');
    }
    if(interaction.data.name == 'platinum'){
      return sendMessageForSpecificRole(res,'1105066586294992906');
    }
    if(interaction.data.name == 'diamond'){
      return sendMessageForSpecificRole(res,'1105066741366796299');
    }
    if(interaction.data.name == 'master'){
      return sendMessageForSpecificRole(res,'1105066879627821086');
    }
    if(interaction.data.name == 'sensei'){
      return sendMessageForSpecificRole(res,'1105529280626172124');
    }
    /*tournaments.forEach(tournament => {
      if(interaction.data.name == `${tournament.name}_register`){
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
              content: `tournament ${tournament.name} register`,
              flags: 64,
            },
          });
      }
      if(interaction.data.name == `${tournament.name}_unregister`){
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
              content: `tournament ${tournament.name} unregister`,
              flags: 64,
            },
          });
      }
      if(interaction.data.name == `${tournament.name}_list`){
        return tournamentList(res,tournament);
    }
  })*/


    /*if(interaction.data.name == 'dm'){
      // https://discord.com/developers/docs/resources/user#create-dm
      let c = (await discord_api.post(`/users/@me/channels`,{
        recipient_id: interaction.member.user.id
      })).data
      try{
        // https://discord.com/developers/docs/resources/channel#create-message
        let res = await discord_api.post(`/channels/${c.id}/messages`,{
          content:'Yo! I got your slash command. I am not able to respond to DMs just slash commands.',
        })
        console.log(res.data)
      }catch(e){
        console.log(e)
      }

      return res.send({
        // https://discord.com/developers/docs/interactions/receiving-and-responding#responding-to-an-interaction
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data:{
          content:'👍'
        }
      });
    }*/
  }

});

app.get('/register_commands', async (req,res) => {


  try
  {
    slash_commands = [];
    challonge_oauth_api.post(
      "/oauth/token",
      {
        client_secret:CHALLONGE_CLIENT_SECRET,
        client_id:CHALLONGE_CLIENT_ID,
        grant_type:"client_credentials",
        scope: 'me tournaments:read matches:read attachments:read participants:write stations:read application:manage'
      },
    ).then(responseee => {
          challonge_oauth_api.get("/v2/application/tournaments.json",{
            headers:{
              "Authorization-Type":"v2",
              'Authorization': 'Bearer ' +responseee.data.access_token,
              "Content-Type":"application/vnd.api+json",
              "Accept":"application/json"
            }
          }
        ).then(responsee => {
              responsee.data.data.map(tournoi => tournoi.id).forEach(tournament => {
                slash_commands.push({
                  "name": `${tournament.toLowerCase()}_register`,
                  "description":"je m'inscris au tournoi",
                  "options": []
                },
                /*{
                  "name": `${t.name}_unregister`,
                  "description":"je me désinscris du tournoi",
                  "options": []
                },
                {
                  "name": `${t.name}_list`,
                  "description":"voir la liste des participants",
                  "options": []
                }*/);
              })
              //console.log(`slash_commands.push => ${util.inspect(slash_commands)}`)



              /*{
                "name": "dm",
                "description": "sends user a DM",
                "options": []
              }*/


      }).then(r => {
            // api docs - https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
            console.log(`slash_commands.push => ${util.inspect(slash_commands)}`)
        discord_api.put(
          `/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`,
          slash_commands
        ).then(responsee => {
        //console.log(discord_response.data)
        return res.send('commands have been registered')
      })
      });
  })
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
