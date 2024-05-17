require('dotenv').config()
const router = require('express').Router()
const fs = require('fs')
const path = require('path')
// const { create } = require('domain')
// const { google } = require('googleapis')

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// const REFRESH_TOKEN = process.env.MY_REFRESH_TOKEN // DELETE

// const oauth2Client = new google.auth.OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   'http://localhost:3000' // Redirect URL
// )

router.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome api server!' })
})

router.post('/create-tokens', async (req, res, next) => {
  try {
    // const { code } = req.body
    // console.log(code, 'code')
    // res.send(tokens)
  } catch (error) {
    next(error)
  }
})

router.get('/data', async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, '../data.json')
    const rawData = fs.readFileSync(dataPath, 'utf8')
    const obj = JSON.parse(rawData)
    res.send(obj)


    // const {
    //   summary,
    // } = req.body
    // res.send(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router