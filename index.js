
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
	try{
	   let response = (await discord_api.get(`/guilds/${GUILD_ID}/members?limit=2`))
	   	console.log(`${util.inspect(response.data)}`);
      		return res.send({
			
        	type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
       		 data: {
          		content: `Nombre de Cammy sur SFF: ${response.data.filter(
				(member) => {
					console.log(`${member.roles.includes('🍵 Cammy')} -- ${member.roles.includes('1105860664624418836')} -- ${member.roles.includes('🍵Cammy')}`);
					return member.roles.includes('1105860664624418836');
				})
			 .map(
				(member) => `@${member.user.username}`
			)}`,
			flags: 64,
        		},
      		});
	}
	    catch(e){
		  console.log(`MY ERROR ${e}`)
    	}
    }

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

