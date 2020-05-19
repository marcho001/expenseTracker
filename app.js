const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/expenseTracker", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('err', () => {
  console.log(error)
})

db.once('open', () => {
  console.log('mongodb is connect!')
})

app.engine('handlebars', exphbs({ defaultLayout : 'main' }))
app.set('view engine', 'handlebars')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen( 3000 , () => {
  console.log('now is running')
})