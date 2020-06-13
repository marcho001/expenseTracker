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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})  

module.exports = mongoose.model('Record', Record)
