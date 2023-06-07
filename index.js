
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 

const util = require('util')
const axios = require('axios')
const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


const app = express();
// app.use(bodyParser.json());

const discord_api = axios.create({
  baseURL: 'https://discord.com/api/',
  timeout: 3000,
  headers: {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
	"Access-Control-Allow-Headers": "Authorization",
	"Authorization": `Bot ${TOKEN}`
  }
});

async function sendMessageForSpecificRole(res,id){
	try{
	   let response = (await discord_api.get(`/guilds/${GUILD_ID}/members?limit=1000`))
	   	console.log(`${util.inspect(response.data)}`);
      		return res.send({
			
        	type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
       		 data: {
          		content: `Nombre de Cammy sur SFF: ${response.data.filter(
				(member) => {
					return member.roles.includes(id);
				})
			 .map(
				(member) => `@${member.user.display_name}`
			)}`,
			flags: 64,
        		},
      		});
	}
	    catch(e){
		  console.log(`MY ERROR ${e}`)
    	}
}

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log(interaction.data.name)
    if(interaction.data.name == 'sffcount'){
	try{
	   let response = (await discord_api.get(`/guilds/${GUILD_ID}?with_counts=true`))
      		return res.send({
		
        	type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
       		 data: {
          		content: `Nombre de membres sur SFF: ${response.data.approximate_member_count}`,
			flags: 64,
        		},
      		});
	}
	    catch(e){
		  console.log(`MY ERROR ${e}`)
    	}
    }
 if(interaction.data.name == 'cammy'){
	return sendMessageForSpecificRole(res,'1105040765186474015');
    }
	  /*
	  {
      id: '1105035482582233160',
      name: '🏝️ Deejay',
      description: null,
      permissions: 0,
      position: 56,
      color: 3066993,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105035703412330506',
      name: '🎌 Honda',
      description: null,
      permissions: 0,
      position: 55,
      color: 3447003,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 0,
      permissions_new: '0'
    },
    {
      id: '1105035782735011902',
      name: '🥋 Ryu',
      description: null,
      permissions: 0,
      position: 54,
      color: 16777215,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105035997705682974',
      name: '🔥 Ken',
      description: null,
      permissions: 0,
      position: 53,
      color: 12648448,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105036157554802688',
      name: '🍔 Guile',
      description: null,
      permissions: 0,
      position: 52,
      color: 4880154,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105036320394457178',
      name: '🕉️ Dhalsim',
      description: null,
      permissions: 0,
      position: 51,
      color: 11027200,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105037949990617129',
      name: '👘 Chunli',
      description: null,
      permissions: 0,
      position: 50,
      color: 2662853,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105039025779261440',
      name: '💪 Marisa',
      description: null,
      permissions: 0,
      position: 49,
      color: 16773120,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105039198588776448',
      name: '🩰 Manon',
      description: null,
      permissions: 0,
      position: 48,
      color: 7716847,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105039328834502739',
      name: '🍺 Jamie',
      description: null,
      permissions: 0,
      position: 47,
      color: 16753152,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105039593235042355',
      name: '🎶 Kimberly',
      description: null,
      permissions: 0,
      position: 46,
      color: 14096640,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105039726815232020',
      name: '🥊 Luke',
      description: null,
      permissions: 0,
      position: 45,
      color: 16086,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105039877797580942',
      name: '🦧 Blanka',
      description: null,
      permissions: 0,
      position: 44,
      color: 8448527,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      
2023-06-07 13:37:30.278: unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105039968210001972',
      name: '👣 Juri',
      description: null,
      permissions: 0,
      position: 43,
      color: 11534568,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105040328429420554',
      name: '🦯 JP',
      description: null,
      permissions: 0,
      position: 42,
      color: 5905291,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105040765186474015',
      name: '🍵 Cammy',
      description: null,
      permissions: 0,
      position: 41,
      color: 45823,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105040908291952650',
      name: '🏏Lily',
      description: null,
      permissions: 0,
      position: 40,
      color: 10737238,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    },
    {
      id: '1105041405753167922',
      name: '🐻 Zangief',
      description: null,
      permissions: 0,
      position: 39,
      color: 15073280,
      hoist: false,
      managed: false,
      mentionable: true,
      icon: null,
      unicode_emoji: null,
      flags: 1,
      permissions_new: '0'
    }
	  */

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



app.get('/register_commands', async (req,res) =>{
  let slash_commands = [
    {
      "name": "sffcount",
      "description": "Retourne le nombre de membres SFF!",
      "options": []
    },
    {
      "name": "cammy",
      "description": "Retourne le nombre de cammy",
      "options": []
    },
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

