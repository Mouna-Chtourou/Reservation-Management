const Reservation = require('../models/reservationModel')
const Salle = require('../models/salleModel')
const User = require('../models/userModel')
const cron = require('node-cron')
const mongoose = require('mongoose')
const Ressource = require('../models/ressourceModel')
const asyncHandler = require('express-async-handler')
const { sendAcceptResEmail, sendRemiderEmail } = require('../utils/sendEmail.js')
const date = require('date-and-time')
const moment = require('moment')

var task = cron.schedule('00 * * * * *', () => {
  Reservation.find({})
    .populate('user', 'email')
    .populate('salle', 'nom')
    .then(allRes => {
      for (let res of allRes) {
        if (
          new Date().getDate() === new Date(res.deDate).getDate() &&
          new Date().getMonth() === new Date(res.deDate).getMonth() &&
          new Date().getYear() === new Date(res.deDate).getYear() &&
          new Date().getFullYear() === new Date(res.deDate).getFullYear() &&
          new Date().getHours() === new Date(res.deDate).getHours() &&
          new Date().getMinutes() === new Date(res.deDate).getMinutes() - 15
        ) {
          sendRemiderEmail(res.user.email, res.salle.nom)
        }
      }
    })
})

task.start()
const getReservation = asyncHandler(async (req, res) => {
  try {
    const reservations = await Reservation.find({ deleted: { $ne: true } })
      .populate('salle', 'nom')
     // .populate('ressource', 'id nom')
      .populate('user', 'id email role')
      .populate({
        path: 'ressource',
        populate: {
          path: 'organisme',
          model: 'organisme',
        },
      })
      .populate({
        path: 'salle',
        populate: {
          path: 'organisme',
          model: 'organisme',
        },
      })

    res.json(reservations)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})



const postReservation = asyncHandler(async (req, res) => {
  try {
    const { ressource = [] } = req.body || {}
    const { titre, salle, deDate, versDate } = req.body
    const dateNow = new Date()
    if (!titre || !salle || !deDate || !versDate) {
      return res.status(400).json({ message: 'Veuillez remplir tout les champs' })
    } else if (new Date(req.body.deDate) < dateNow) {
      res.status(400).json({
        message: "Impossible de réserver la salle dans cette date c'est trop tard",
      })
    } else if (!(deDate < versDate) && versDate !== null) {
      res.status(400).json({
        message: 'Date début de la réservation doit être avant dete fin de la réservation',
      })
    } else {
      const reservations = await Reservation.find({
        $and: [
          {
            $or: [
              { deDate: { $gte: req.body.deDate, $lte: req.body.versDate } },
              {
                versDate: { $gte: req.body.deDate, $lte: req.body.versDate },
              },
              {
                $and: [
                  { deDate: { $lte: req.body.deDate } },
                  { versDate: { $gte: req.body.versDate } },
                ],
              },
            ],
          },
          { salle: req.body.salle },
          { deleted: { $ne: true } },
          { etat: { $ne: false } },
        ],
      })

      if (reservations.length === 0) {
        const newReservation = new Reservation({
          titre,
          salle,
          user: req.user._id,
          ressource: ressource ? ressource.map(id => mongoose.Types.ObjectId(id)) : [],
          deDate,
          versDate,
        })
        const savedReservation = await newReservation.save()
        res.status(201).json(savedReservation)
      } else {
        res.status(404).json({ message: 'Réservation est impossible dans cette date' })
      }
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

const diponibiliteReservation = asyncHandler(async (req, res) => {
  const { debut, fin } = req.query

  const start = new Date(debut)
  const end = new Date(fin)

  const usedResources = await Reservation.aggregate([
    { $lookup: { from: 'ressources', localField: 'ressource', foreignField: '_id', as: 'res' } },

    {
      $match: {
        $and: [
          {
            $or: [
              { deDate: { $gte: start, $lte: end } },
              { versDate: { $gte: start, $lte: end } },
              { $and: [{ deDate: { $lte: start } }, { versDate: { $gte: end } }] },
            ],
          },
          { deleted: { $ne: true } },
        ],
      },
    },

    { $project: { reserved: '$res' } },
  ]).then(data => data.map(item => item.reserved.map(({ _id }) => _id.toString())).flat())

  const count = {}
  usedResources.forEach(id => {
    if (count[id]) count[id]++
    else count[id] = 1
  })

  await Ressource.aggregate([
    { $match: { $and: [{ deleted: false }, { quantiteDispo: { $gt: 0 } }] } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categorie',
        foreignField: '_id',
        as: 'cat',
      },
    },
    {
      $lookup: {
        from: 'organismes',
        localField: 'organisme',
        foreignField: '_id',
        as: 'org',
      },
    },
    { $unwind: '$cat' },
    { $unwind: '$org' },

    {
      $group: {
        _id: '$cat.nom',
        items: {
          $push: { res: '$nom', res_id: '$_id', organisme: '$org.nom', qte: '$quantiteDispo' },
        },
      },
    },
  ])
    .then(data => {
      res.status(200).json(
        data.map(({ items, ...group }) => ({
          ...group,
          items: items
            .map(item => ({ ...item, qte: item.qte - (count[item.res_id] || 0) }))
            .filter(({ qte }) => qte > 0),
        }))
      )
    })
    .catch(() => {
      res.status(404).json({
        message: 'Réservation est impossible dans cette date',
      })
    })
})

const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id)
  console.log(req.body)
  if (reservation) {
    reservation.titre = req.body.titre
    reservation.deDate = req.body.deDate
    reservation.versDate = req.body.versDate
    reservation.ressource = req.body.ressource

    const reservations = await Reservation.find({
      $and: [
        {
          $or: [
            { deDate: { $gte: req.body.deDate, $lte: req.body.versDate } },
            {
              versDate: { $gte: req.body.deDate, $lte: req.body.versDate },
            },
            {
              $and: [
                { deDate: { $lte: req.body.deDate } },
                { versDate: { $gte: req.body.versDate } },
              ],
            },
          ],
        },
        { salle: req.body.salle },
        { deleted: { $ne: true } },
      ],
    })
    if (reservations.length === 0) {
      const updatedReservation = await reservation.save()

      res.json(updatedReservation)
    } else {
      res.status(404).json({ message: "reservation n'est pas trouvé" })
    }
  } else {
    return res.status(404).json({
      message: 'Il y a déjà une réservation dans cette salle dans le même temps ',
    })
  }
})

const deleteReservation = asyncHandler(async (req, res) => {
  const dateNow = new Date()
  try {
    const reserv = await Reservation.findById(req.params.id)
    // if(dateNow < new Date(reserv.deDate)){
    await reserv.updateOne({ $set: { deleted: true } })
    res.send('reservationDeleted')
    //}

    const reservation = await Reservation.findById(req.params.id)
    const a = reservation.ressource.map(async e => {
      await Ressource.updateOne({ _id: e }, { $inc: { quantiteRes: -1, quantiteDispo: 1 } })
    })
  } catch (err) {}
})

const libererReservation = asyncHandler(async (req, res) => {
  const dateNow = new Date()
  const { versDate } = req.body.versDate

  try {
    const reserv = await Reservation.findById(req.params.id)
    // if(dateNow < new Date(reserv.deDate)){
    await reserv.updateOne({ $set: { versDate: req.body.versDate } })
    res.send('Salle libérer')
    //}
    const reservation = await Reservation.findById(req.params.id)
    const a = reservation.ressource.map(async e => {
      await Ressource.updateOne({ _id: e }, { $inc: { quantiteRes: -1, quantiteDispo: 1 } })
    })
  } catch (err) {}
})

const acceptReservations = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id)
    .populate('salle', 'id nom')
    .populate('user', 'id email')
  if (reservation) {
    b = false
    const updatedReservation = await reservation.updateOne({
      $set: { status: true },
    })
    res.json(updatedReservation)
    const date = reservation.deDate.toString().slice(0, 15)
    const de = reservation.deDate.toString().slice(16, 21)
    const vers = reservation.versDate.toString().slice(16, 21)
    await sendAcceptResEmail(reservation.user.email, reservation.salle.nom, date, de, vers)
  } else {
    res.status(404).json({ errorMessage: "reservation n'existe pas" })
  }
})

const ressourceReservation = asyncHandler(async (req, res) => {
  try {
    function addHours(numOfHours, date = new Date()) {
      const dateCopy = new Date(date.getTime())

      dateCopy.setTime(dateCopy.getTime() + numOfHours * 60 * 60 * 1000)

      return dateCopy
    }
    const now = new Date()
    const result = addHours(1, now)
    const reservations = await Reservation.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { deDate: { $gte: new Date(), $lte: result } },
                {
                  versDate: { $gte: new Date(), $lte: result },
                },
                {
                  $and: [{ deDate: { $lte: new Date() } }, { versDate: { $gte: result } }],
                },
              ],
            },
            //{salle : req.body.salle},
            { deleted: { $ne: true } },
            { etat: { $ne: false } },
          ],
        },
      },
      { $project: { nom: '$titre', ressource: '$ressource' } },
    ])

    res.status(200).json(reservations)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

module.exports = {
  getReservation,
  postReservation,
  updateReservation,
  deleteReservation,
  acceptReservations,
  libererReservation,
  ressourceReservation,
  diponibiliteReservation,
}