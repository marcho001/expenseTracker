const express = require('express')
const app = express()
const routes = require('./routes/index')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout : 'main' }))
app.set('view engine', 'handlebars')

app.use('/',express.static('./public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended : true }))
app.use(routes)


app.listen( PORT , () => {
  console.log('now is running')
})