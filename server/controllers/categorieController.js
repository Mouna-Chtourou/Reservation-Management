const Categorie = require('../models/categorieModel')
const Ressource = require('../models/ressourceModel')
const asyncHandler = require('express-async-handler')

const getCategorie = asyncHandler(async (req, res) => {
  try {
    const categories = await Categorie.find({ deleted: { $ne: true } })
    res.json(categories)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const postCategorie = asyncHandler(async (req, res) => {
  try {
    const { nom } = req.body

    if (!nom) {
      return res.status(400).json({ message: 'Veuillez remplir tout les champs' })
    }
    const categorieExiste = await Categorie.findOne({ nom: req.body.nom })
    if (categorieExiste) {
      return res.status(400).json({ message: 'Une categorie avec ce nom existe déjà' })
    } else {
      const newCategorie = new Categorie({ nom })

      const savedCategorie = await newCategorie.save()

      res.status(201).json(savedCategorie)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: err.message })
  }
})

const updateCategorie = asyncHandler(async (req, res) => {
  const categorie = await Categorie.findById(req.params.id)
  if (categorie) {
    categorie.nom = req.body.nom

    const updatedCategorie = await categorie.save()
    res.json(updatedCategorie)
  } else {
    res.status(404).json({ errorMessage: "catégorie n'est pas trouvé" })
  }
})
const getCategorieById = asyncHandler(async (req, res) => {
  const categorie = await Categorie.findById(req.params.id)
  if (categorie) {
    res.json(categorie.nom)
  } else {
    res.status(404).json({ errorMessage: "Categorie n'est pas trouvé" })
  }
})
const deleteCategorie = asyncHandler(async (req, res) => {
  try {
    await Categorie.findById(req.params.id).updateOne({ $set: { deleted: true } })
    const categorie = await Categorie.findById(req.params.id)
    res.send('categorieDeleted')
    await Ressource.findOne({ categorie: categorie.id }).updateOne({ $set: { deleted: true } })
  } catch (err) {}
})

module.exports = {
  getCategorie,
  postCategorie,
  updateCategorie,
  getCategorieById,
  deleteCategorie,
}
