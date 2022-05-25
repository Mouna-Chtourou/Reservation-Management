const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/error.js')
const connectDB = require('./config/db.js')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const path = require('path')
const usersRouter = require('./routes/userRoute')
const organismesRouter = require('./routes/organismeRoute')
const employesRouter = require('./routes/employeRouter')
const sallesRouter = require('./routes/salleRoute')
const ressourcesRouter = require('./routes/ressourceRoute')
const categoriesRouter = require('./routes/categorieRoute')
const reservationsRouter = require('./routes/reservationRoute')
const statistiqueRouter = require('./routes/statistiqueRouter')

const port = process.env.PORT || 5000

connectDB()
const app = express()
app.listen(port, () => {
  console.log('server is running')
})

app.use('/uploads', express.static('uploads'))
app.use(express.json())
express.urlencoded({ extended: true })
app.use(errorHandler)
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
)

app.use('/users', usersRouter)
app.use('/organismes', organismesRouter)
app.use('/employes', employesRouter)
app.use('/salles', sallesRouter)
app.use('/ressources', ressourcesRouter)
app.use('/categories', categoriesRouter)
app.use('/reservations', reservationsRouter)
app.use('/statistiques', statistiqueRouter)
