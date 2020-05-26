const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
let categoryList = []

router.get('/', (req, res) => {
  let totalCost = 0
  let total = 80000
  Record.find()
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
              res.render('index', { cost : record, total, totalCost, categoryList })
              
            })
            .catch(err => console.log('//err'))
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

          categoryAmount += i.amount
      })

      res.render('index', { cost: record, totalCost : categoryAmount, categoryList ,categoryAmount})
    })
    .catch(err => console.log('err'))


})

module.exports = router