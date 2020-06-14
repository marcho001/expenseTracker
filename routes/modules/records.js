const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


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
  if (!date) {
    let timeNow = new Date()
    date = timeNow.toLocaleDateString()
  }
  if ( !amount || !name || typeof amount === String ){
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
    userId
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log('err'))
})

module.exports = router