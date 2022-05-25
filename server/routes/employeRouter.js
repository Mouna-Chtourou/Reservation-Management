const router = require('express').Router()
const EmployeController = require('../controllers/employeControlller')
const auth = require('../middleware/auth')

router.get('/', auth, EmployeController.getEmployes)
router.delete('/delete/:id', auth, EmployeController.deleteEmploye)
router.post('/', auth, EmployeController.postEmploye)
router.get('/demandes', auth, EmployeController.getDemandes)
router.put('/accept/:id', auth, EmployeController.acceptDemandes)
router.put('/desactiver/:id', auth, EmployeController.DesactiverCompte)
router.put('/modifier/:id', auth, EmployeController.updateEmploye)
router.post('/inscription/:id', EmployeController.signup)

module.exports = router
