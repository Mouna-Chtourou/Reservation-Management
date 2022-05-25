const router = require('express').Router()
const ressourceController = require('../controllers/ressourceController.js')
const auth = require('../middleware/auth')
require('dotenv').config()

router.get('/', auth, ressourceController.getRessource)
router.get('/admin', auth, ressourceController.getRessourceAdmin)
router.post('/create', auth, ressourceController.postRessource)
router.put('/:id', auth, ressourceController.updateRessource)
router.delete('/delete/:id', auth, ressourceController.deleteRessource)
router.get('/ressourceByCat', auth, ressourceController.getRessourceByGroup)

module.exports = router