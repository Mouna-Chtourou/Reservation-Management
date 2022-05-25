const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ressourceSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    organisme: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'organisme',
    },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'categorie',
    },
    quantiteDispo: {
      type: Number,
      default: 1,
      required: true,
    },
    quantiteRes: {
      type: Number,
      default: 0,
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
const Ressource = mongoose.model('ressource', ressourceSchema)

module.exports = Ressource
