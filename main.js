const discord = require('discord.js');
const client = new discord.Client();
// new 
require('dotenv').config();
const mongoose = require('mongoose'); 
const songSchema = require ('./schemas/song')

const data = {
    id:5,
    artist: "Tyga, Doja Cat",
    song: "Freaky Deaky",
    link: "https://www.youtube.com/watch?v=5ZHXYnGVlcg"
}


mongoose.connect(require('./config.json').mongo,{

userNewUrlParser:true,
useUnifiedTopology:true,
userFindAndModify:false
}).then(async ()=>{
console.log('Connected to the database!')


 //await new songSchema(data).save()

}).catch((err)=>{

    console.log(err);


});



client.on('ready', () => {
console.log('ready');


client.ws.on('INTERACTION_CREATE', async interaction => {

    const result = await songSchema.findOne({});

    const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
    
            if(command == 'suggest') {
                 
                const randomNumber = Math.floor(Math.random() * songSchema.length);
                const query = {id: randomNumber};

                 const result = await songSchema.findOne(query) ;
                
                data.artist = result.artist;
                data.song = result.song;
                data.link  = result.link;
              

                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: `Artist: ${data.artist}\nSong: ${data.song}\nLink: ${data.link}`
                            
                        }
                    
                    }
                });
            }
            
            if(command == "specific-artist") {
                const description = args.find(arg => arg.name.toLowerCase() == "name").value;
                
                
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction,arrayTheWeekend[Math.floor(Math.random()*arrayTheWeekend.length)])
                    }
                });
            }


})


});



async function createAPIMessage(interaction, content) {
    const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}

client.login(require('./config.json').token);


// TINY DATABASES 

let arrayTheWeekend= [

'https://www.youtube.com/watch?v=LKsgDcckur0',
'https://www.youtube.com/watch?v=XXYlFuWEuKI',
'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
'https://www.youtube.com/watch?v=rhTl_OyehF8',
'https://www.youtube.com/watch?v=yzTuBuRdAyA',
'https://www.youtube.com/watch?v=waU75jdUnYw',

];


