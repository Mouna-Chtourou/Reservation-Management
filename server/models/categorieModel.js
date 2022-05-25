const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorieSchema = new Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const Categorie = mongoose.model('categorie', categorieSchema)

module.exports = Categorie
