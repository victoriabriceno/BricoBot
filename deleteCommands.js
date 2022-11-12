const discord = require('discord.js');
const client = new discord.Client();


// DELETING PART

client.api.applications(client.user.id).commands("1032692482917531790").delete(); // random already delete but it was still showing
client.api.applications(client.user.id).commands("1035337796166107246").delete(); // specif-artist duplicate
client.api.applications(client.user.id).commands("1035337795104948344").delete();// suggest duplicate
client.api.applications(client.user.id).commands("1039996149219741777").delete();// play-song
