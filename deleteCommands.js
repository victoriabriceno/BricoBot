const discord = require('discord.js');
const client = new discord.Client();


// DELETING PART

client.api.applications(client.user.id).commands("1032692482917531790").delete();
client.api.applications(client.user.id).commands("1035337796166107246").delete();
client.api.applications(client.user.id).commands("1035337795104948344").delete();
