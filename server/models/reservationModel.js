const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reservationSchema = new Schema(
  {
    titre: { type: String, required: true },
    salle: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'salle' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    ressource: { type: [mongoose.Schema.Types.ObjectId], required: true, ref: 'ressource' },
    deDate: { type: Date, required: true },
    versDate: { type: Date, required: true },
    etat: { type: Boolean, required: true, default: true },
    status: { type: Boolean, required: true, default: false },
    deleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

const Reservation = mongoose.model('reservation', reservationSchema)

module.exports = Reservation
