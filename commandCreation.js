const discord = require('discord.js');
const client = new discord.Client();

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