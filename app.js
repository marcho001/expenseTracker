const express = require('express')
const session = require('express-session')
const app = express()
const routes = require('./routes/index')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const userPassport = require('./config/passport')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')
const PORT = process.env.PORT

app.engine('handlebars', exphbs({ defaultLayout : 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: process.env.SESSION_SECRECT,
  resave: false,
  saveUninitialized: true
}))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended : true }))
userPassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use('/',express.static('./public'))
app.use(routes)

app.listen( PORT , () => {
  console.log('now is running')
})