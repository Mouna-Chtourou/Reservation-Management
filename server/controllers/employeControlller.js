const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const validateEmail = require('../utils/validateEmail')
const userController = require('../controllers/userController.js')
const EmailVerify = require('../models/emailVerify.js')
const { continuerSingUp, sendAcceptEmail } = require('../utils/sendEmail.js')

const getEmployes = asyncHandler(async (req, res) => {
  try {
    const emp = await User.find({ deleted: { $ne: true } }).populate({
      path: 'organisme',
      select: 'id nom',
    })
    res.json(emp)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
const postEmploye = asyncHandler(async (req, res) => {
  try {
    const role = req.body.role || 'employe'

    const { prenom, nom, email, organisme, telephone } = req.body

    if (!prenom || !nom || !email || !organisme || !telephone || !role) {
      return res.status(400).json({ message: 'Veuillez saisir tous les champs obligatoires.' })
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Format de l'adresse Email est incorecte." })
    }

    let userExiste = await User.findOne({ email: req.body.email })
    if (userExiste) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà' })
    }
    const newUser = new User({
      prenom,
      nom,
      email,
      organisme,
      role,
      telephone,
      verifie: false,
      status: true,
    })

    const savedUser = await newUser.save()
    if (!savedUser) {
      res.status(404).json({ message: 'not found' })
    }
    const url = `${process.env.BASE_URL}employes/inscription/${savedUser._id}`
    await continuerSingUp(savedUser.email, url)
    return res.status(201).json({
      message: 'Un email est envoyé à votre compte',
      user: {
        _id: savedUser.id,
        prenom: savedUser.prenom,
        nom: savedUser.nom,
        email: savedUser.email,
        organisme: savedUser.organisme,
        role: savedUser.role,
        telephone: savedUser.telephone,
        verifie: savedUser.verifie,
        status: savedUser.status,
        token: userController.generateToken(savedUser._id),
      },
    })
  } catch (error) {
    res.status(400).json({ message: 'Données utilisateur invalide' })
  }
})

const signup = asyncHandler(async (req, res) => {
  const { password, passwordVerify } = req.body
  const { id } = req.params
  const user = await User.findById(id)

  if (user) {
    if (password === passwordVerify) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
      user.verifie = true
    } else {
      res.status(400).json({ message: 'Les mots de passes ne correspondent pas' })
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      prenom: updatedUser.prenom,
      nom: updatedUser.nom,
      email: updatedUser.email,
      organisme: updatedUser.organisme,
      role: updatedUser.role,
      telephone: updatedUser.telephone,
      verifie: updatedUser.verifie,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404).json({ message: "Utilisateur n'est pas trouvé" })
  }
})

const deleteEmploye = asyncHandler(async (req, res) => {
  try {
    await User.findById(req.params.id).updateOne({ $set: { deleted: true } })
    res.send('employeDeleted')
  } catch (err) {}
})

const getDemandes = asyncHandler(async (req, res) => {
  try {
    const demandes = await User.find({ $and: [{ deleted: false }, { status: false }] }).populate({
      path: 'organisme',
      select: 'nom',
    })
    res.json(demandes)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

const acceptDemandes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    const updatedUser = await user.updateOne({ $set: { status: true } })
    res.json(updatedUser)
    const url = `${process.env.BASE_URL}`
    await sendAcceptEmail(user.email, url)
  } else {
    res.status(404).json({ errorMessage: "user n'existe pas" })
  }
})

const DesactiverCompte = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    const updatedUser = await user.updateOne({ $set: { status: false } })
    res.json({ updatedUser, message: 'Compte désactiver' })
  } else {
    res.status(404).json({ errorMessage: "user n'existe pas" })
  }
})
const updateEmploye = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.email = req.body.email || user.email
    user.organisme = req.body.organisme || user.organisme
    user.role = req.body.role || user.role

    user.save(function (err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the post',
        })
      }
      user.populate(
        {
          path: 'organisme',
          select: 'id nom',
        },
        function (err, updatedUser) {
          res.json(updatedUser)
        }
      )
    })
  } else {
    res.status(404).json({ errorMessage: "utilisateur n'est pas trouvé" })
  }
})
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  })
}

module.exports = {
  getEmployes,
  deleteEmploye,
  postEmploye,
  getDemandes,
  updateEmploye,
  acceptDemandes,
  signup,
  DesactiverCompte,
}
