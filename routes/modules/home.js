const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
let total
let categoryList = []

router.get('/', (req, res) => {
  let totalCost = 0
  Record.find()
    .lean()
    .then((record) => {
      total = record.filter(i => i.totalAmount)[0].totalAmount || 0
      const spend = record.filter(i => !i.totalAmount)
      record.forEach((i) => {

        switch(i.category){
          case "家居物業":
            i.icon = '<i class="fas fa-home h1"></i>'
            break;
          case "交通出行":
            i.icon = '<i class="fas fa-shuttle-van h1"></i> '
            break;
          case "休閒娛樂":
            i.icon = '<i class="fas fa-grin-beam h1"></i>' 
            break;
          case "餐飲食品":
            i.icon = '<i class="fas fa-utensils h1"></i>'
            break;
          case "其他":
            i.icon = '<i class="fas fa-pen h1"></i>'
            break;
        }

        if (i.amount !== undefined) {
          totalCost += i.amount
        }
        if (!categoryList.includes(i.category)) categoryList.push(i.category)
      })

      total -= totalCost
      res.render('index', { cost: spend, total, totalCost, categoryList })

    })
})

router.get('/category/:item', (req, res) => {
  Record.find({ "category": `${req.params.item}` })
    .lean()
    .then((record) => {
      let categoryAmount = 0
      record.forEach((i) => {

        switch (i.category) {
          case "家居物業":
            i.icon = '<i class="fas fa-home h1"></i>'
            break;
          case "交通出行":
            i.icon = '<i class="fas fa-shuttle-van h1"></i> '
            break;
          case "休閒娛樂":
            i.icon = '<i class="fas fa-grin-beam h1"></i>'
            break;
          case "餐飲食品":
            i.icon = '<i class="fas fa-utensils h1"></i>'
            break;
          case "其他":
            i.icon = '<i class="fas fa-pen h1"></i>'
            break;
        }

        if (i.amount !== undefined) {
          categoryAmount += i.amount
        }
      })

      res.render('index', { cost: record, totalCost: categoryAmount, categoryList ,categoryAmount})
    })

})

module.exports = router