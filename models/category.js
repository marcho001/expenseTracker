const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Category', categorySchema)