const Reservation = require('../models/reservationModel')
const User = require('../models/userModel')
const Salle = require('../models/salleModel')
const Ressource = require('../models/ressourceModel')

const asyncHandler = require('express-async-handler')
const { findById } = require('../models/reservationModel')

const getReservationStat = asyncHandler(async (req, res) => {
  try {
    currentdate = new Date()
    var oneJan = new Date(currentdate.getFullYear(), 0, 1)
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000))
    var result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7)

    const reservations = await Reservation.aggregate([
      { $group: { _id: '$salle', nbr_reservation: { $count: {} } } },
    ])

    res.json(reservations)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreEmpParOrg = asyncHandler(async (req, res) => {
  try {
    const employes = await User.aggregate([
      {
        $lookup: {
          from: 'organismes',
          localField: 'organisme',
          foreignField: '_id',
          as: 'organisme',
        },
      },
      { $match: { role: 'employe' } },
      { $unwind: '$organisme' },
      { $group: { _id: '$organisme.nom', nbr_emp: { $sum: 1 } } },
      { $project: { nom: '$_id', _id: false, nbr_emp: 1 } },
      // {"$sort" : {"count" : -1}},
    ])
    res.json(employes)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
const getNombreSalleParOrg = asyncHandler(async (req, res) => {
  try {
    const salles = await Salle.aggregate([
      {
        $lookup: {
          from: 'organismes',
          localField: 'organisme',
          foreignField: '_id',
          as: 'organisme',
        },
      },
      { $unwind: '$organisme' },
      { $group: { _id: '$organisme.nom', nbr_salle: { $sum: 1 } } },
      { $project: { nom: '$_id', _id: false, nbr_salle: 1 } },
    ])
    res.json(salles)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreResParSalle = asyncHandler(async (req, res) => {
  try {
    // const reservations = await Reservation.aggregate([
    //   {
    //     $lookup: {
    //       from: "salles",
    //       localField: "salle",
    //       foreignField: "_id",
    //       as: "salle",
    //     },
    //   },
    //   { $match: { status: true} },
    //   { $unwind: "$salle" },
    //   { $group: { _id: "$salle.nom", nbr_reservation: { $sum: 1 } } },
    //   { $project: { nom: "$_id", _id: false, nbr_reservation: 1 } },
    //   { $sort: { nbr_reservation: -1 } },
    //   { $limit: 4 },
    // ]);
    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: 'salles',
          localField: 'salle',
          foreignField: '_id',
          as: 'sal',
        },
      },
      {
        $lookup: {
          from: 'organismes',
          localField: 'sal.organisme',
          foreignField: '_id',
          as: 'org',
        },
      },
      { $unwind: '$sal' },
      { $unwind: '$org' },
      { $match: { status: true } },

      {
        $group: {
          _id: { salle: '$sal.nom', organisme: '$org.nom' },
          nbr_reservation: { $sum: 1 },
        },
      },
      { $project: { nom: '$_id', _id: false, nbr_reservation: 1 } },
      { $sort: { nbr_reservation: -1 } },
      { $limit: 4 },
    ])
    res.json(reservations)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreResParOrganisme = asyncHandler(async (req, res) => {
  try {
    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: 'salles',
          localField: 'salle',
          foreignField: '_id',
          as: 'sal',
        },
      },
      {
        $lookup: {
          from: 'organismes',
          localField: 'sal.organisme',
          foreignField: '_id',
          as: 'organisme',
        },
      },
      { $unwind: '$organisme' },
      { $match: { status: true } },
      { $unwind: '$salle' },
      { $group: { _id: '$organisme.nom', nbr_reservation: { $sum: 1 } } },
      { $project: { nom: '$_id', _id: false, nbr_reservation: 1 } },
      { $sort: { nbr_reservation: -1 } },
      { $limit: 4 },
    ])
    res.json(reservations)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreRessourceParOrg = asyncHandler(async (req, res) => {
  try {
    const ressources = await Ressource.aggregate([
      {
        $lookup: {
          from: 'organismes',
          localField: 'organisme',
          foreignField: '_id',
          as: 'organisme',
        },
      },
      { $unwind: '$organisme' },
      { $group: { _id: '$organisme.nom', nbr_reservation: { $sum: 1 } } },
      { $project: { nom: '$_id', _id: false, nbr_reservation: 1 } },
      { $sort: { nbr_reservation: -1 } },
      { $limit: 4 },
    ])
    res.json(ressources)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.aggregate([
      { $match: { role: 'employe' } },
      { $group: { _id: '$organisme', nbr: { $sum: 1 } } },
    ])
    const users_total = await User.count()
    res.json({ users, users_total })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
const getNombreRes = asyncHandler(async (req, res) => {
  try {
    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: 'salles',
          localField: 'salle',
          foreignField: '_id',
          as: 'sal',
        },
      },
      {
        $lookup: {
          from: 'organismes',
          localField: 'sal.organisme',
          foreignField: '_id',
          as: 'organisme',
        },
      },
      { $match: { status: true } },
      { $unwind: '$organisme' },
      { $unwind: '$salle' },
      { $group: { _id: '$organisme._id', nbr: { $sum: 1 } } },
    ])
    const reservations_total = await Reservation.aggregate([
      { $match: { status: true } },
      { $group: { _id: null, nbr: { $sum: 1 } } },
      { $project: { _id: false, nbr: 1 } },
    ])
    res.json({ reservations, reservations_total })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreSalle = asyncHandler(async (req, res) => {
  try {
    const salles = await Salle.aggregate([{ $group: { _id: '$organisme', nbr: { $sum: 1 } } }])
    const salles_total = await Salle.count()
    res.json({ salles, salles_total })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
const getNombreRessource = asyncHandler(async (req, res) => {
  try {
    const ressources = await Ressource.aggregate([
      { $group: { _id: '$organisme', nbr: { $sum: 1 } } },
    ])
    const ressources_total = await Ressource.count()
    res.json({ ressources, ressources_total })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNbSalleAvecRessource = asyncHandler(async (req, res) => {
  try {
    const salles_organisme = await Salle.aggregate([
      {
        $project: {
          salle: 1,
          avec: {
            $cond: [{ $ne: ['$ressource', []] }, 1, 0],
          },
          sans: {
            $cond: [{ $eq: ['$ressource', []] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: '$salle',
          countAvec: { $sum: '$avec' },
          countSans: { $sum: '$sans' },
        },
      },
      {
        $project: {
          _id: false,
          avec: { count: '$countAvec', description: 'avec ressource' },
          sans: { count: '$countSans', description: 'sans ressource' },
        },
      },
    ])

    const salles = await Salle.aggregate([
      {
        $project: {
          sal: '$nom',
          organisme: '$organisme',
          ressource: '$ressource',
        },
      },
      {
        $project: {
          // salle: 1,
          organisme: '$organisme',
          ressource: '$ressource',
          avec: {
            $cond: [{ $ne: ['$ressource', []] }, 1, 0],
          },
          sans: {
            $cond: [{ $eq: ['$ressource', []] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: { org: '$organisme', sal: '$_id' },
          countAvec: { $sum: '$avec' },
          countSans: { $sum: '$sans' },
        },
      },
      {
        $project: {
          _id: false,
          organisme: '$_id',
          avec: { count: '$countAvec', description: 'avec ressource' },
          sans: { count: '$countSans', description: 'sans ressource' },
        },
      },
    ])
    res.json({ salles_organisme, salles })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreResParSem = asyncHandler(async (req, res) => {
  try {
    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: 'salles',
          localField: 'salle',
          foreignField: '_id',
          as: 'salle',
        },
      },
      { $match: { status: true } },
      {
        $project: {
          createdAtMonth: {
            $month: '$deDate',
          },
        },
      },
      { $group: { _id: '$createdAtMonth', nbr_reservation: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
    const reservations_organisme = await Reservation.aggregate([
      {
        $lookup: {
          from: 'salles',
          localField: 'salle',
          foreignField: '_id',
          as: 'sal',
        },
      },
      {
        $lookup: {
          from: 'organismes',
          localField: 'sal.organisme',
          foreignField: '_id',
          as: 'org',
        },
      },
      { $match: { status: true } },
      { $unwind: '$_id' },
      { $unwind: '$org' },

      {
        $group: {
          _id: '$org.nom',
          records: {
            $push: '$$ROOT',
          },
          count: {
            $sum: 1,
          },
        },
      },
      { $unwind: '$records' },

      {
        $group: {
          _id: {
            organisme: '$_id',
            createdAtMonth: { $month: '$records.deDate' },
          },
          count_: {
            $sum: 1,
          },
        },
      },
      { $sort: { _id: 1 } },
      // {$limit : 4}
    ])
    res.json({ reservations, reservations_organisme })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNombreResParJour = asyncHandler(async (req, res) => {
  try {
    const reservations = await Reservation.aggregate([
      {
        $lookup: {
          from: 'salles',
          localField: 'salle',
          foreignField: '_id',
          as: 'salle',
        },
      },
      { $match: { status: true } },
      {
        $project: {
          createdAtDay: {
            $dayOfMonth: '$deDate',
          },
          createdAtMonth: {
            $month: '$deDate',
          },
        },
      },
      {
        $group: {
          _id: { month: '$createdAtMonth', day: '$createdAtDay' },
          nbr_reservation: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {$limit : 20}
    ])

    const reservations_organisme = await Reservation.aggregate([
      {
        $lookup: {
          from: 'salles',
          localField: 'salle',
          foreignField: '_id',
          as: 'sal',
        },
      },
      {
        $lookup: {
          from: 'organismes',
          localField: 'sal.organisme',
          foreignField: '_id',
          as: 'org',
        },
      },
      { $match: { status: true } },
      { $unwind: '$_id' },
      { $unwind: '$org' },

      {
        $group: {
          _id: '$org.nom',
          records: {
            $push: '$$ROOT',
          },
          count: {
            $sum: 1,
          },
        },
      },
      { $unwind: '$records' },

      {
        $group: {
          _id: {
            organisme: '$_id',
            createdAtMonth: { $month: '$records.deDate' },
            createdAtDay: { $dayOfMonth: '$records.deDate' },
          },
          count_: {
            $sum: 1,
          },
        },
      },
      { $sort: { _id: 1 } },
      // {$limit : 4}
    ])
    res.json({ reservations, reservations_organisme })
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
module.exports = {
  getReservationStat,
  getNombreEmpParOrg,
  getNombreSalleParOrg,
  getNombreResParSalle,
  getNombreUser,
  getNombreRes,
  getNombreResParSem,
  getNombreSalle,
  getNombreRessource,
  getNombreResParOrganisme,
  getNombreRessourceParOrg,
  getNbSalleAvecRessource,
  getNombreResParJour,
}
