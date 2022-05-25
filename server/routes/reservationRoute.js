const router = require('express').Router()
const reservationController = require('../controllers/reservationController')
const auth = require('../middleware/auth')

require('dotenv').config()

router.get('/', auth, reservationController.getReservation)
router.post('/create', auth, reservationController.postReservation)
router.get('/disponibilite', auth, reservationController.diponibiliteReservation)
router.put('/:id', auth, reservationController.updateReservation)
router.delete('/:id', auth, reservationController.deleteReservation)
router.put('/accept/:id', auth, reservationController.acceptReservations)
router.put('/liberer/:id', auth, reservationController.libererReservation)
router.get('/get', auth, reservationController.ressourceReservation)

module.exports = router