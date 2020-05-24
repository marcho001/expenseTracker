const Record = require('../record')
const seed = require('./seeder.json')
require('../../config/mongoose')

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

