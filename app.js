const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')

mongoose.connect("mongodb://localhost/expenseTracker", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('err', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('mongodb is connect!')
})

app.engine('handlebars', exphbs({ defaultLayout : 'main' }))
app.set('view engine', 'handlebars')

app.use('/',express.static('./public'))


app.get('/', (req, res) => {
  let totalCost = 0
  let total
  let category = []
  Record.find()
    .lean()
    .then((record) => {
      total = record.filter(i => i.totalAmount)[0].totalAmount
      const spend = record.filter(i => !i.totalAmount)
      record.forEach((i) => {
        if (i.amount !== undefined) {
          totalCost += i.amount
        }
        if (!category.includes(i.category)) category.push(i.category)
      })

      total -= totalCost
      res.render('index', { spend, total, totalCost, category })

    })
})

app.get('/records/:id/edit' ,(req, res) => {
  return Record.findById(req.params.id)
    .lean()
    .then( edit => res.render('edit' , { edit }) )
    .catch( err => console.log('err') )
})

app.get('/records/create', (req, res) => {
  let isCreatePage = true 
  res.render('edit' ,{ create : isCreatePage })
})

app.get

app.post('/records/:id/delete' ,(req, res) => {
  return Record.findById(req.params.id)
    .then( record => record.remove() )
    .then( () => res.redirect('/') )
    .catch( err => console.log('err'))

})

app.listen( 3000 , () => {
  console.log('now is running')
})