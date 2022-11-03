const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
id: Number,
artist: String,
song: String,
link: String
})

module.exports = mongoose.model('items',userSchema)