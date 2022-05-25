const mongoose = require('mongoose')
const Schema = mongoose.Schema

const emailVerifySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
})

const EmailVerify = mongoose.model('emailVerify', emailVerifySchema)

module.exports = EmailVerify
