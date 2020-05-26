const Record = require('../record')
const seed = require('./seeder.json')
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expenseTracker'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

require('../../config/mongoose')

db.once('open', () => {
  seed.forEach((record) => {
    Record.create({
      amount : record.amount,
      name : record.name,
      date : record.date,
      category : record.category,
      account : record.account,
    })
  })
  
  console.log('done')
})

