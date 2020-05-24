const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Record = new Schema({
  amount : {
    type: Number,
    require: true,
  },
  name : {
    type: String,
    require: true
  },
  date : {
    type: String
  },
  category : {
    type: String
  },
  account : {
    type: String,
    default: "現金"
  },
  totalAmount : {
    type : Number
  }
})  

module.exports = mongoose.model('Record', Record)
