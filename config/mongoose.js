const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expenseTracker'
mongoose.connect( MONGODB_URI, { useNewUrlParser : true , useUnifiedTopology : true, useCreateIndex: true })
const db = mongoose.connection
db.on('err', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb coneected')
})

module.exports = db