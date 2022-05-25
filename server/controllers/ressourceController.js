const Ressource = require('../models/ressourceModel')
const asyncHandler = require('express-async-handler')

const getRessource = asyncHandler(async (req, res) => {
  try {
    const ressources = await Ressource.find({
      $and: [{ deleted: false }, { quantiteDispo: { $gt: 0 } }],
    })
      .populate('organisme', 'nom')
      .populate('categorie', 'id nom')

    res.json(ressources)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getRessourceByGroup = asyncHandler(async (req, res) => {
  try {
    const ressources = await Ressource.aggregate([
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
          ress: { $push: { res: '$nom', res_id: '$_id', organisme: '$org.nom' } },
        },
      },
    ])

    res.json(ressources)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getRessourceAdmin = asyncHandler(async (req, res) => {
  try {
    const ressources = await Ressource.find({ deleted: false })
      .populate('organisme', 'nom')
      .populate('categorie', 'id nom')
    res.json(ressources)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const postRessource = asyncHandler(async (req, res) => {
  try {
    const quantiteDispo = req.body.quantiteDispo || 1
    const { nom, organisme, categorie } = req.body

    if (!nom || !organisme || !categorie) {
      return res.status(400).json({ message: 'Veuillez remplir tout les champs' })
    }
    const ressourceExiste = await Ressource.findOne({
      nom: req.body.nom,
      organisme: req.body.organisme,
    })
    if (ressourceExiste) {
      const updatedRessource = await ressourceExiste.updateOne({ $inc: { quantiteDispo: 1 } })
      res.json(updatedRessource)
    } else {
      const newRessource = new Ressource({ nom, organisme, categorie, quantiteDispo })

      const savedRessource = await newRessource.save()

      res.status(201).json(savedRessource)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

const updateRessource = asyncHandler(async (req, res) => {
  const ressource = await Ressource.findById(req.params.id)
  if (ressource) {
    ressource.nom = req.body.nom || ressource.nom
    ressource.organisme = req.body.organisme || ressource.organisme
    ressource.categorie = req.body.categorie || ressource.categorie
    ressource.quantiteDispo = req.body.quantiteDispo || ressource.quantiteDispo
    const updatedRessource = await ressource.save()
    res.json(updatedRessource)
  } else {
    res.status(404).json({ errorMessage: "ressource n'est pas trouvé" })
  }
})

const deleteRessource = asyncHandler(async (req, res) => {
  try {
    await Ressource.findById(req.params.id).updateOne({ $set: { deleted: true } })
    res.send('ressourceDeleted')
  } catch (err) {
    console.log(err)
  }
})

const ajouterRessource = asyncHandler(async (req, res) => {
  try {
    await Ressource.findById(req.params.id).updateOne({ $inc: { quantiteDispo: 1 } })
    res.send('quantite Ressource ajoutée')
  } catch (err) {
    console.log(err)
  }
})
module.exports = {
  getRessource,
  postRessource,
  updateRessource,
  deleteRessource,
  getRessourceAdmin,
  ajouterRessource,
  getRessourceByGroup,
}
