const mongo = require('../mongo')
const mongoose = require('mongoose')

const kickSchema = mongoose.Schema({
  userId: String,
  guildId: String,
  reason: String,
  moderatorId: String,
})

module.exports = mongoose.model('kicks', kickSchema)