const express = require('express')
const app = express()
const routes = require('./routes/index')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Record = require('./models/record')
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

// app.get('/', (req, res) => {
//   let totalCost = 0
//   Record.find()
//     .lean()
//     .then((record) => {
//       total = record.filter(i => i.totalAmount)[0].totalAmount
//       const spend = record.filter(i => !i.totalAmount)
//       record.forEach((i) => {
//         if (i.amount !== undefined) {
//           totalCost += i.amount
//         }
//         if (!categoryList.includes(i.category)) categoryList.push(i.category)
//       })

//       total -= totalCost
//       res.render('index', { cost : spend, total, totalCost, categoryList })

//     })
// })

// app.get('/records/:id/edit' ,(req, res) => {
//   return Record.findById(req.params.id)
//     .lean()
//     .then( edit => res.render('edit' , { edit }) )
//     .catch( err => console.log('err') )
// })

// app.get('/records/create', (req, res) => {
//   let isCreatePage = true 
//   res.render('edit' ,{ create : isCreatePage })
// })

// app.get('/category/:item', (req, res) => {
//   Record.find({ "category" : `${req.params.item}`})
//     .lean()
//     .then((record) => {
//       let categoryAmount = 0
//       record.forEach((i) => {
//         if (i.amount !== undefined) {
//            categoryAmount += i.amount
//         }
//       })
//       console.log(categoryAmount)
//       res.render('index', { cost : record, totalCost : categoryAmount, categoryList })
//     })
    
// })

// app.post('/records/:id/delete' ,(req, res) => {
//   return Record.findById(req.params.id)
//     .then( record => record.remove() )
//     .then( () => res.redirect('/') )
//     .catch( err => console.log('err'))

// })

// app.post('/records/:id/edit', (req, res) => {
//   return Record.findById(req.params.id)
//     .then((newRecord) => {
//       newRecord = Object.assign( newRecord, req.body)
//       console.log(newRecord)
//       return newRecord.save()
//     })
//     .then(() => res.redirect('/'))
//     .catch(err => console.log('err'))
// })

// app.post('/records/create', (req, res) => {
//   return Record.create(req.body)
//     .then(() => res.redirect('/'))
//     .catch(err => console.log('err'))
// })

app.listen( 3000 , () => {
  console.log('now is running')
})