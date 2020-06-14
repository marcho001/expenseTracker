const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Record = new Schema({
  amount : {
    type: Number,
    required: true,
  },
  name : {
    type: String,
    required: true
  },
  date : {
    type: String
  },
  month: {
    type: String
  },
  category : {
    type: String
  },
  account : {
    type: String,
    default: "現金"
  },
  merchant: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})  

module.exports = mongoose.model('Record', Record)
