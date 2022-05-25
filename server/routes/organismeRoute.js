const router = require('express').Router()
const OrganismeController = require('../controllers/OrganismeController.js')
const auth = require('../middleware/auth')
require('dotenv').config()

router.get('/register', OrganismeController.OrganismeRegister)

router.get('/', auth, OrganismeController.getOrganismes)
router.post('/create', auth, OrganismeController.postOrganisme)
router.get('organisme/:id', auth, OrganismeController.getOrganismeByid)
router.put('/:id', auth, OrganismeController.updateOrganisme)
router.delete('/delete/:id', auth, OrganismeController.deleteOrganisme)
router.get('/organisme/nom', auth, OrganismeController.getNom_organisme)

module.exports = router
