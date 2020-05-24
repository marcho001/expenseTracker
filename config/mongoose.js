const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expenseTracker', { useNewUrlParser : true , useUnifiedTopology : true })
const db = mongoose.connection
db.on('err', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb coneected')
})

module.exports = db