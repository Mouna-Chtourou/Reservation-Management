const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const EmailVerify = require('../models/emailVerify.js')
const { sendVerificationEmail, sendForgotPasswordEmail } = require('../utils/sendEmail.js')
const crypto = require('crypto')
const validateEmail = require('../utils/validateEmail')

//sign up
const postUser = asyncHandler(async (req, res) => {
  try {
    const { prenom, nom, email, password, passwordVerify, organisme, role, telephone } = req.body
    if (!prenom || !nom || !email || !organisme || !telephone || !password || !passwordVerify) {
      return res.status(400).json({ message: 'Veuillez saisir tous les champs obligatoires.' })
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Format de l'adresse Email est incorecte." })
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Veuillez entrer un mot de passe d'au moins 6 caractères",
      })
    }
    if (password !== passwordVerify) {
      return res.status(400).json({ message: 'Veuillez entrer le même mot de passe ' })
    }

    let userExiste = await User.findOne({ email: req.body.email })
    if (userExiste) {
      return res.status(400).json({ message: 'Un compte avec cet email existe déjà' })
    }

    //hashpassword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      prenom,
      nom,
      email,
      password: hashedPassword,
      organisme,
      role,
      telephone,
      verifie: false,
      status: false,
    })
    const savedUser = await newUser.save()

    if (!savedUser) {
      res.status(404).json({ message: 'not found' })
    }
    const emailverify = await new EmailVerify({
      userId: savedUser._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save()
    const url = `${process.env.BASE_URL}users/${savedUser._id}/verify/${emailverify.token}`
    await sendVerificationEmail(savedUser.email, 'Verifier Email', url)
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
        token: generateToken(savedUser._id),
      },
    })
  } catch (error) {
    res.status(400).json({ message: 'Données utilisateur invalide' })
  }
})

const verifyToken = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (!user) return res.status(400).send({ message: 'Lien invalide pb lawel' })

    const emailverify = await EmailVerify.findOne({
      userId: user._id,
      token: req.params.token,
    })
    if (!emailverify) return res.status(400).send({ message: 'Lien invalide pb theny' })

    await User.updateOne({ _id: user._id }, { verifie: true })
    emailverify.remove()

    return res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erreur dans serveur interne ' })
  }
})

//login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez saisir tous les champs obligatoires.' })
  }

  const userExiste = await User.findOne({ email }).populate({ path: 'organisme', select: 'id nom' })
  if (!userExiste) {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' })
  }
  if (userExiste.status === false) {
    res.status(401).json({ message: "Compte n'est pas encore accepté par l'administrateur " })
  } else {
    const passwordCorrect = await bcrypt.compare(password, userExiste.password)
    if (!userExiste.verifie) {
      let emailverify = await EmailVerify.findOne({ userId: userExiste._id })

      if (!emailverify) {
        emailToken = await new EmailVerify({
          userId: userExiste._id,
          token: crypto.randomBytes(32).toString('hex'),
        }).save()
        const url = `${process.env.BASE_URL}users/${userExiste.id}/verify/${emailverify.token}`
        await sendVerificationEmail(userExiste.email, 'Verifier Email', url)
      }
      res.status(401).json({ messgae: 'Email envoyé a votre compte' })
    }
    if (passwordCorrect) {
      res.json({
        _id: userExiste.id,
        prenom: userExiste.prenom,
        nom: userExiste.nom,
        email: userExiste.email,
        organisme: userExiste.organisme,
        role: userExiste.role,
        telephone: userExiste.telephone,
        verifie: userExiste.verifie,
        token: generateToken(userExiste._id),
      })
    } else {
      res.status(401).json({ message: 'Email ou mot de passe non reconnu' })
    }
  }
})

const getRepresentants = asyncHandler(async (req, res) => {
  try {
    const representants = await User.find({ $and: [{ deleted: false }, { role: 'representant' }] })
    res.json(representants)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.prenom = req.body.prenom || user.prenom
    user.nom = req.body.nom || user.nom
    user.email = req.body.email || user.email
    user.organisme = req.body.organisme || user.organisme
    user.telephone = req.body.telephone || user.telephone
    if (req.body.password) {
      user.password = req.body.password
    }

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
        }
      )
    })
  } else {
    res.status(404).json({ message: "Utilisateur n'est pas trouvé" })
  }
})

//loggedIn
const loggedIn = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

//forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Veuillez entrer votre adresse E-mail' })
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Veuillez entrer une adresse E-mail valide' })
    }

    const userExiste = await User.findOne({ email })

    if (!userExiste) {
      return res.status(404).json({ message: "Utilisateur n'est pas trouvé" })
    }
    const secret = userExiste._id + process.env.JWT_SECRET
    const token = jwt.sign({ userID: userExiste._id }, secret, {
      expiresIn: '15m',
    })
    const url = `${process.env.BASE_URL}users/verifyPassword/${userExiste._id}/${token}`
    await sendForgotPasswordEmail(userExiste.email, url)
    res.status(200).json({ message: 'Un email est envoyé à votre compte' })
  } catch (error) {
    res.status(500).json({ message: 'Un email est envoyé à votre compte' })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password, passwordVerify } = req.body
  const { id, token } = req.params
  const user = await User.findById(id)
  const new_secret = user._id + process.env.JWT_SECRET
  try {
    jwt.verify(token, new_secret)
    if (password && passwordVerify) {
      if (password !== passwordVerify) {
        res.send({
          status: 'failed',
          message: 'les mots de passes ne correspondent pas',
        })
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.findOneAndUpdate({ _id: user._id }, { password: hashedPassword })
        res.status(200).json({ message: 'Mot de passe est changé avec succes!' })
      }
    } else {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'invalide token' })
  }
})

// Generate JWT
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  })
}

module.exports = {
  postUser,
  login,
  updateProfile,
  loggedIn,
  verifyToken,
  forgotPassword,
  resetPassword,
  getRepresentants,
  generateToken,
}
