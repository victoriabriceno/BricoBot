const discord = require('discord.js');
const client = new discord.Client();
// new 
const ytdl = require("ytdl-core");
require('dotenv').config();
const mongoose = require('mongoose'); 
const songSchema = require ('./schemas/song')



const data = {
    id:10,
    artist: "bee gees",
    song: "night fever",
    link: "https://www.youtube.com/watch?v=-ihs-vT9T3Q&list=RDEMcfITQdR3Yi7wdBAWKFypdA&index=2"
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

    const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
    
            if(command == 'suggest') {
                 
                const cursor = await songSchema.find({});
                const randomNumber = Math.floor(Math.random() * cursor.length);
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
                
                const query = {artist: description.toLowerCase()};
                 
                data.artist = null;
                try{
                const cursor = await songSchema.find({artist: description.toLowerCase()});
               

                const randomSongs = Math.floor(Math.random() * cursor.length);
                
                data.artist = cursor[randomSongs].artist;
                data.song = cursor[randomSongs].song;
                data.link  = cursor[randomSongs].link;
                
                // const result = await songSchema.findOne(query) ;
               
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: await createAPIMessage(interaction,`Artist: ${data.artist}\nSong: ${data.song}\nLink: ${data.link}`)
                        }
                    });
                }catch(err){
                    client.api.interactions(interaction.id, interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: await createAPIMessage(interaction,"Sorry this artist is not in the database!")
                        }
                    });
                }
               
            }

            if(command == "play-song"){
                const url = args.find(arg=> arg.name.toLowerCase() == "url").value;
               

                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction,"hello")
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




