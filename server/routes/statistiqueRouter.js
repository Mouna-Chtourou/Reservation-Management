const router = require('express').Router()
const statistiqueController = require('../controllers/statistiqueController')
const auth = require('../middleware/auth')

require('dotenv').config()

router.get('/employes', auth, statistiqueController.getNombreEmpParOrg)
router.get('/salles', auth, statistiqueController.getNombreSalleParOrg)
router.get('/reservations', auth, statistiqueController.getNombreResParSalle)
router.get('/reservationParOrg', auth, statistiqueController.getNombreResParOrganisme)
router.get('/users', auth, statistiqueController.getNombreUser)
router.get('/nbRes', auth, statistiqueController.getNombreRes)
router.get('/nbSalle', auth, statistiqueController.getNombreSalle)
router.get('/nbRessource', auth, statistiqueController.getNombreRessource)
router.get('/res/semaine', auth, statistiqueController.getNombreResParSem)
router.get('/ressources', auth, statistiqueController.getNombreRessourceParOrg)
router.get('/salle_ressources', auth, statistiqueController.getNbSalleAvecRessource)
router.get('/jour', auth, statistiqueController.getNombreResParJour)

module.exports = router
