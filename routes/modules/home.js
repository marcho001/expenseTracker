const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
let categoryList = []
let month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalCost = 0
  let total = 80000
  Record.find({ userId })
  .lean()
  .then((record) => {
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
                
                totalCost += i.amount
                
                if (!categoryList.includes(i.category)) categoryList.push(i.category)
              })
              
              total -= totalCost
              console.log(record)
              res.render('index', { cost : record, total, totalCost, categoryList ,month})
              
            })
            .catch(err => console.log('//err'))
          })

router.post('/filter', (req, res) => {
  const userId = req.user._id
  const { category, month } = req.body
  Record.find({ userId })
    .lean()
    .then((record) => {
      let cost
      let categoryAmount = 0
      if (category && month) {
        cost = record.filter(item => {
          return item.category === category && item.month === month
        })
      } else if (category && !month) {
        cost = record.filter(item => item.category === category)
      } else if (month && !category) {
        cost = record.filter(item => item.month === month)
      } else if (!category && !month) {
        return res.redirect('/')
      }
      cost.forEach((i) => {
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
        categoryAmount += i.amount
      })
      
      console.log(cost)
      res.render('index', { cost, totalCost: categoryAmount, categoryList, categoryAmount, month })
    })
    .catch(err => console.log(err))
})
          


module.exports = router