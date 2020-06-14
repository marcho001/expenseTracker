const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(edit => {
      const { name, amount, date, category, merchant, description, account } = edit
      res.render('edit', { 
        edit,
        name,
        amount,
        date,
        category,
        merchant,
        description,
        account
      })
    })
      
    .catch(err => console.log('err'))
})

router.get('/create', (req, res) => {
  let isCreatePage = true
  res.render('edit', { create: isCreatePage })
})


router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log('err'))

})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then((newRecord) => {
      newRecord = Object.assign(newRecord, req.body)
      return newRecord.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log('err'))
})

router.post('/create', (req, res) => {
  const userId = req.user._id
  const { amount, name, category, merchant,
    description, account } = req.body
  let date = req.body.date
  let month = date[5] + date[6]

  if (!date) {
    const timeNow = new Date()
    const YYYY = timeNow.getFullYear()
    const MM = (timeNow.getMonth() + 1).toString()
    const DD = (timeNow.getDate()).toString()
    date = `${YYYY}-${MM.padStart(2, '0')}-${DD.padStart(2,'0')}`
    month = MM
  }
  if ( typeof amount === String || !amount || !name ){
    let isCreatePage = true
    let errors = [{message: '輸入格式錯誤！'}]
    return res.render('edit',{ 
      errors,
      create: isCreatePage,
      name,
      category,
      merchant,
      description,
      account,
      date
    })
  }
  return Record.create({
    amount,
    name,
    date,
    category,
    account,
    merchant,
    description,
    month,
    userId
  })
    .then(record => {
      const category = record.category
      let icon = ''
        switch (category) {
          case "家居物業":
            icon = '<i class="fas fa-home h1"></i>'
            break;
          case "交通出行":
            icon = '<i class="fas fa-shuttle-van h1"></i> '
            break;
          case "休閒娛樂":
            icon = '<i class="fas fa-grin-beam h1"></i>'
            break;
          case "餐飲食品":
            icon = '<i class="fas fa-utensils h1"></i>'
            break;
          case "其他":
            icon = '<i class="fas fa-pen h1"></i>'
            break;
        }
        console.log(category, icon)
      Category.create({ category, icon, userId })
        .then(() => res.redirect('/'))
        .catch(err => {
          Category.find({ category })
            .lean()
            .then((isExist) => {
              if (isExist) return res.redirect('/')
              console.log(err)
            })
        })
    })
    .catch(err => console.log('err'))
})

module.exports = router