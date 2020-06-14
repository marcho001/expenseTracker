const Category = require('../category')
const mongoose = require('mongoose')
let categoryList = [{
  category:'家居物業',
  icon: '<i class="fas fa-home h1"></i>'
},
  {
    category: '交通出行',
    icon: '<i class="fas fa-shuttle-van h1"></i> '
  },
  {
    category: '休閒娛樂',
    icon: '<i class="fas fa-grin-beam h1"></i>'
  },
  {
    category: '餐飲食品',
    icon: '<i class="fas fa-utensils h1"></i>'
  },
  {
    category: '其他',
    icon: '<i class="fas fa-pen h1"></i>'
  },

]

require('../../config/mongoose')

db.once('open', () => {
  categoryList.forEach((record) => {
    Record.create({
      category: record.category,
      icon: record.icon
    })
  })

  console.log('done')
})
