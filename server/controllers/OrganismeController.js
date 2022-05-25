const Organisme = require('../models/organismeModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const Salle = require('../models/salleModel')

const getOrganismes = asyncHandler(async (req, res) => {
  try {
    const organismes = await Organisme.find({ deleted: { $ne: true } }).populate(
      'representant',
      'nom prenom'
    )
    res.json(organismes)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getNom_organisme = asyncHandler(async (req, res) => {
  try {
    const nomOrg = await Organisme.find({}, { nom: 1 })
    res.json(nomOrg)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
const OrganismeRegister = asyncHandler(async (req, res) => {
  try {
    const organismes = await Organisme.find({ deleted: { $ne: true } })
    res.json(organismes)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const getOrganismeByid = asyncHandler(async (req, res) => {
  const organisme = await Organisme.findById(req.params.id)

  if (organisme) {
    res.json(organisme)
  } else {
    res.status(404).json({ errorMessage: "organisme n'est pas trouvé" })
  }
})

const updateOrganisme = asyncHandler(async (req, res) => {
  const organisme = await Organisme.findById(req.params.id)
  if (organisme) {
    organisme.nom = req.body.nom
    organisme.representant = req.body.representant
    organisme.nbr_employe = req.body.nbr_employe
    organisme.telephone = req.body.telephone
    organisme.fax = req.body.fax

    const updatedOrganisme = await organisme.save()
    res.json(updatedOrganisme)
  } else {
    res.status(404).json({ errorMessage: "organisme n'est pas trouvé" })
  }
})

const postOrganisme = asyncHandler(async (req, res) => {
  try {
    const { nom, representant, nbr_employe, telephone, fax } = req.body

    if (!nom || !representant || !nbr_employe || !telephone || !fax) {
      return res.status(400).json({ message: 'Veuillez remplir tout les champs' })
    }
    const orgExiste = await Organisme.findOne({ nom: req.body.nom })
    if (orgExiste) {
      return res.status(400).json({ message: 'Une organisme avec ce nom existe déjà' })
    } else {
      const newOrganisme = new Organisme({ nom, representant, nbr_employe, telephone, fax })

      const savedOrganisme = await newOrganisme.save()

      res.status(201).json(savedOrganisme)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

const deleteOrganisme = asyncHandler(async (req, res) => {
  try {
    await Organisme.findById(req.params.id).updateOne({ $set: { deleted: true } })
    res.send('organismeDeleted')
    const organisme = await Organisme.findById(req.params.id)
    await Salle.findOne({ organisme: organisme.id }).updateOne({ $set: { deleted: true } })
  } catch (err) {
    console.log(err)
  }
})

module.exports = {
  postOrganisme,
  getOrganismes,
  getOrganismeByid,
  deleteOrganisme,
  updateOrganisme,
  OrganismeRegister,
  getNom_organisme,
}
