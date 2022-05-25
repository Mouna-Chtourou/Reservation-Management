const mongoose = require('mongoose')
const Schema = mongoose.Schema

const organismeSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
    },
    representant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    nbr_employe: {
      type: Number,
      required: true,
    },

    telephone: {
      type: Number,
      required: true,
    },
    fax: {
      type: Number,
      required: true,
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

const Organisme = mongoose.model('organisme', organismeSchema)

module.exports = Organisme
