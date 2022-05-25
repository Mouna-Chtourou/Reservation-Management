const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salleSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    nom: {
      type: String,
      required: true,
    },
    organisme: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'organisme',
    },
    capacité: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      enum: ['fermée', 'ouverte'],
    },
    reservé: {
      type: Boolean,
      default: false,
      required: true,
    },
    ressource: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ressource',
      },
    ],
    image: {
      type: String,
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

const Salle = mongoose.model('salle', salleSchema)

module.exports = Salle
