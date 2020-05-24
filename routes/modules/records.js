const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


router.get('/:id/edit', (req, res) => {
  return Record.findById(req.params.id)
    .lean()
    .then(edit => res.render('edit', { edit }))
    .catch(err => console.log('err'))
})

router.get('/create', (req, res) => {
  let isCreatePage = true
  res.render('edit', { create: isCreatePage })
})


router.delete('/:id', (req, res) => {
  return Record.findById(req.params.id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log('err'))

})

router.put('/:id', (req, res) => {
  return Record.findById(req.params.id)
    .then((newRecord) => {
      newRecord = Object.assign(newRecord, req.body)
      return newRecord.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log('err'))
})

router.post('/create', (req, res) => {
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log('err'))
})

module.exports = router