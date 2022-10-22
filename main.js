const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log('ready');

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "suggest",
            description: "Suggest a random song!"
            
        }
    });

    client.api.applications(client.user.id).commands.post({
        data: {
            name: "specific-artist",
            description: "Give a random song from the artist!",

            options: [
                {
                    name: "name",
                    description: "The name of the artist",
                    type: 3,
                    required: true
                }
            ]
        }
    });


    let theWeekend = Math.floor(Math.random()*arrayTheWeekend.length) ;
    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if(command == 'suggest') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: arraysongs[Math.floor(Math.random()*arraysongs.length)]
                    }
                }
            });
        }
        
        if(command == "specific-artist") {
            const description = args.find(arg => arg.name.toLowerCase() == "name").value;
            
            
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: await createAPIMessage(interaction, arrayTheWeekend[Math.floor(Math.random()*arrayTheWeekend.length)])
                }
            });
        }
        
    });
});

async function createAPIMessage(interaction, content) {
    const apiMessage = await discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
        .resolveData()
        .resolveFiles();
    
    return { ...apiMessage.data, files: apiMessage.files };
}

client.login(require('./config.json').token);


// TINY DATABASES 
let arraysongs = [

'https://www.youtube.com/watch?v=hsWtqQMpCg4&list=RDhsWtqQMpCg4&start_radio=1',
'https://www.youtube.com/watch?v=LKsgDcckur0',
'https://www.youtube.com/watch?v=j1W5An7eo2g',
'https://www.youtube.com/watch?v=5ZHXYnGVlcg',
'https://www.youtube.com/watch?v=H5v3kku4y6Q',
'https://www.youtube.com/watch?v=VbfpW0pbvaU',
'https://www.youtube.com/watch?v=_ecXNJP-ERY',
'https://www.youtube.com/watch?v=W1tzURKYFNs',
];

let arrayTheWeekend= [

'https://www.youtube.com/watch?v=LKsgDcckur0',
'https://www.youtube.com/watch?v=XXYlFuWEuKI',
'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
'https://www.youtube.com/watch?v=rhTl_OyehF8',
'https://www.youtube.com/watch?v=yzTuBuRdAyA',
'https://www.youtube.com/watch?v=waU75jdUnYw',

];


