const mongoose = require('mongoose')
const mongo = require('../mongo')

const warnSchema = mongoose.Schema({
  userId: String,
  guildId: String,
  moderatorId: String,
  reason: String,
  timestamp: String,
})

module.exports = mongoose.model('warnings', warnSchema)