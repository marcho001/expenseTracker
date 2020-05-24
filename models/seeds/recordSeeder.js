const mongoose = require('mongoose')
const db = mongoose.connection
const Record = require('../record')
const seed = require('./seeder.json')

mongoose.connect('mongodb://localhost/expenseTracker')

db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  seed.forEach((record) => {
    Record.create({
      amount : record.amount,
      name : record.name,
      date : record.date,
      category : record.category,
      account : record.account,
      totalAmount : record.totalAmount
    })
  })
  
  console.log('done')
})

