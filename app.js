const express = require('express')
const app = express()
const routes = require('./routes/index')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

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
app.use(bodyParser.urlencoded({ extended : true }))
app.use(routes)

app.listen( 3000 , () => {
  console.log('now is running')
})