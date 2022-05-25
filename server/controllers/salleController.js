const Salle = require('../models/salleModel')
const asyncHandler = require('express-async-handler')
const path = require('path')
const mongoose = require('mongoose')
const Ressource = require('../models/ressourceModel')
const Reservation = require('../models/reservationModel')
var ObjectId = require("mongodb").ObjectId;

const getSalle = asyncHandler(async (req, res) => {
  try {
    const salles = await Salle.find({ deleted: { $ne: true } })
      .populate('organisme', 'nom')
      .populate({
        path: 'ressource',
        populate: {
          path: 'categorie',
          model: 'categorie',
        },
      })
      .populate({
        path: 'ressource',
        populate: {
          path: 'organisme',
          model: 'organisme',
        },
      })
    res.json(salles)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const postSalle = asyncHandler(async (req, res) => {
  try {
    const { ressource = [] } = req.body || {}
    const { reference, nom, organisme, capacité, description } = req.body
    const image = req.file.path
    if (!reference || !nom || !organisme || !capacité || !description || !image) {
      return res.status(400).json({ message: 'Veuillez remplir tout les champs' })
    }
    if (req.file == undefined) {
      return res.status(400).send({ message: 'Veuiilez télécharger photo !' })
    }
    const salleExiste = await Salle.findOne({ reference: req.body.reference })
    if (salleExiste) {
      return res.status(400).json({ message: 'Une salle avec cette référence existe déjà' })
    } else {
      const newSalle = new Salle({
        reference,
        nom,
        organisme,
        capacité,
        description,
        ressource: ressource ? ressource.split(',').map(id => mongoose.Types.ObjectId(id)) : [],
        image,
      })
      const savedSalle = await newSalle.save()
      if (ressource) {
        const a = newSalle.ressource.map(async e => {
          await Ressource.updateOne({ _id: e }, { $inc: { quantiteRes: 1, quantiteDispo: -1 } })
        })
      }
      res.status(201).json(savedSalle)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

const updateSalle = asyncHandler(async (req, res) => {
  const salle = await Salle.findById(req.params.id)
  salle.ressource.map(async(item) => (
  (!req.body.ressource.includes(item)) && 
   await Ressource.updateOne({ _id: item }, { $inc: { quantiteRes: -1, quantiteDispo: 1 } }) ))
   
  req.body.ressource.split(',').map(async e => (
    (!salle.ressource.includes(e)) &&
        await Ressource.updateOne({ _id: e }, { $inc: { quantiteRes: 1, quantiteDispo: -1 } }) ))
  
  if (salle) {
    salle.reference = req.body.reference || salle.reference
    salle.nom = req.body.nom || salle.nom
    salle.organisme = req.body.organisme || salle.organisme
    salle.capacité = req.body.capacité || salle.capacité
    salle.description = req.body.description || salle.description
     salle.ressource = req.body.ressource ? req.body.ressource.split(',').map(id => mongoose.Types.ObjectId(id)) : [] || salle.ressource

   // console.log('hey' + req.body.ressource)
    if (req.file) {
      salle.image = req.file.path
      // return res.status(400).send({ message: "Veuiilez télécharger photo !" });
    }

    const updatedSalle = await salle.save()
    res.json(updatedSalle)
  } else {
    res.status(404).json({ errorMessage: "salle n'est pas trouvé" })
  }
})

const deleteSalle = asyncHandler(async (req, res) => {
  try {
    await Salle.findById(req.params.id).updateOne({ $set: { deleted: true } })
    res.send('salleDeleted')
    const salle = await Salle.findById(req.params.id)
    const a = salle.ressource.map(async e => {
      await Ressource.updateOne({ _id: e }, { $inc: { quantiteRes: -1, quantiteDispo: 1 } })
    })
    await Reservation.findOne({ salle: salle.id }).updateOne({
      $set: { deleted: true },
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = {
  getSalle,
  postSalle,
  updateSalle,
  deleteSalle,
}
