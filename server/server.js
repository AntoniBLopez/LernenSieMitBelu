const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '/.env.server') })
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const cors = require('cors')

const app = express()
/* To be able to receive the JSON requests */
app.use(express.json())
/* Improve app security */
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(helmet.contentSecurityPolicy({ // Set the CSP policy
  directives: {
    defaultSrc: ["'self'"],
    connectSrc: ["'self'", "https://lernen-sie-mit-belu.vercel.app/"], /* CHANGE THE URL WHEN ADDED THE DOMAIN */
  }
}))
/* Logs HTTP requests arriving to the server in the console */
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
/* Allows cross origin requests */
app.use(cors()) // REMOVE FOR PRODUCTION
// app.use(cors({ // ADD FOR PRODUCTION
//   origin: 'https://lernen-sie-mit-belu.vercel.app'
// }))


app.get('/', (req, res, next) => {
  res.send({ message: 'Awesome server!' })
})
app.use('/api', require('./routes/routes.js'))
app.use((req, res, next) => {
  next(createError.NotFound())
})
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ status: err.status || 500, message: err.message })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => { console.log(`> App listening on port: http://localhost:${PORT}`) })
