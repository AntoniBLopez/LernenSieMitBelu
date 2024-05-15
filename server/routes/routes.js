require('dotenv').config()
const router = require('express').Router()
const { create } = require('domain')
const { google } = require('googleapis')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REFRESH_TOKEN = process.env.MY_REFRESH_TOKEN // DELETE

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000' // Redirect URL
)

router.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome api server!' })
})

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body
    console.log(code, 'code')
    const { tokens } = await oauth2Client.getToken(code)
    /* Keep safe the refresh token: tokens.refresh_token and save it in your database */
    console.log(tokens.refresh_token, 'tokens.refresh_token')
    res.send(tokens)
  } catch (error) {
    next(error)
  }
})

// router.post('/create-calendar', async (req, res, next) => {
//   try {
//     const { name } = req.body
//     const calendar = google.calendar('v3')
//     // calendar.calendars.insert

//     oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
//     const response = await calendar.calendars.insert({
//       auth: oauth2Client,
//       calendarId: name,
//       resource: {
//         summary: name,
//         timeZone: 'America/Los_Angeles'
//       }
//     })
//     res.send(response)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/create-event', async (req, res, next) => {
  try {
    // this is the event you want to create
    console.log('inside create-event')
    console.log(req.body, 'req.body')
    const {
      summary,
      description,
      location,
      startDate,
      endDate
    } = req.body

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    console.log(REFRESH_TOKEN, 'REFRESH_TOKEN')
    const calendar = google.calendar('v3')

    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      // resource: {
      requestBody: {
        summary,
        description,
        location,
        colorId: '7', /* Color id: 1. blue, 2. green, 3. purple, 4. red, 5. yellow, 6. orange, 7. turquoise, 8. gray 9. bold blue 10. bold green 11. bold red  */
        start: {
          dateTime: new Date(startDate)
        },
        end: {
          dateTime: new Date(endDate)
        }
      }
    })
    res.send(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router