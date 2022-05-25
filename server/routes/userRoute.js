const router = require('express').Router()
require('dotenv').config()
const auth = require('../middleware/auth')
const UserController = require('../controllers/userController.js')

//inscription
router.post('/', UserController.postUser)

//login
router.post('/login', UserController.login)

//loggedIn
router.get('/loggedIn', auth, UserController.loggedIn)

router.post('/profile', auth, UserController.updateProfile)

//verifier email
router.get('/:id/verify/:token/', UserController.verifyToken)

//forgot password
router.post('/forgotpassword', UserController.forgotPassword)

//resetPassword
router.post('/resetpassword/:id/:token', UserController.resetPassword)

router.get('/representants', UserController.getRepresentants)

module.exports = router
