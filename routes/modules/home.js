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
      total = record.filter(i => i.totalAmount)[0].totalAmount
      const spend = record.filter(i => !i.totalAmount)
      record.forEach((i) => {
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
        if (i.amount !== undefined) {
          categoryAmount += i.amount
        }
      })

      res.render('index', { cost: record, totalCost: categoryAmount, categoryList ,categoryAmount})
    })

})

module.exports = router