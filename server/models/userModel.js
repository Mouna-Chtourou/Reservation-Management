const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    organisme: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'organisme',
    },
    role: {
      type: String,
      enum: ['admin', 'representant', 'employe'],
      default: 'employe',
    },
    telephone: {
      type: Number,
      required: true,
    },
    verifie: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)
const User = mongoose.model('user', userSchema)

module.exports = User
