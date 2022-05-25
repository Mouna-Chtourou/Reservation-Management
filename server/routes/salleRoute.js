const router = require('express').Router()
const salleController = require('../controllers/salleController.js')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

require('dotenv').config()

router.get('/', auth, salleController.getSalle)
router.post('/create', auth, upload.single('image'), salleController.postSalle)
router.put('/:id', auth, upload.single('image'), salleController.updateSalle)
router.delete('/delete/:id', auth, salleController.deleteSalle)

module.exports = router
