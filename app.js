const express = require('express')
const session = require('express-session')
const app = express()
const routes = require('./routes/index')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000
const userPassport = require('./config/passport')
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout : 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'thisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended : true }))

userPassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use('/',express.static('./public'))
app.use(routes)


app.listen( PORT , () => {
  console.log('now is running')
})