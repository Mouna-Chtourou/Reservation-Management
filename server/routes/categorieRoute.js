const router = require('express').Router()
const categorieController = require('../controllers/categorieController.js')
const auth = require('../middleware/auth')
require('dotenv').config()

router.get('/', auth, categorieController.getCategorie)
router.post('/create', auth, categorieController.postCategorie)
router.put('/:id', auth, categorieController.updateCategorie)
router.delete('/delete/:id', auth, categorieController.deleteCategorie)
router.get('/categorie/:id', auth, categorieController.getCategorieById)

module.exports = router
