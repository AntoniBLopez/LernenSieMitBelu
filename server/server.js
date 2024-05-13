require("dotenv").config() //  doesn't work, i don't know why
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
// const routes = require('./routes/routes.js')
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
    connectSrc: ["'self'", "http://taskease.click"],
  }
}))
/* Logs HTTP requests arriving to the server in the console */
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
/* Allows cross origin requests, REMOVE BEFORE PRODUCTION */
app.use(cors())


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
app.listen(PORT, () => { console.log(`> App listening on port ${PORT}`) })




// let db;

// // DB CONNECTION
// connectToDb(err => {
//   if (!err) {
//     app.listen(PORT, () => {
//       console.log(`App listening on port: ${PORT}`)
//       routes.auth(app, db)
//       routes.users(app, db)
//       routes.posts(app, db)
//       app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, '../build/index.html'));
//       })
//     })
//     db = getDb()
//   }
// })