export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {
  return Response.json({ data: 'Working!' })
}





















// const router = require('express').Router()
// const fs = require('fs')
// const path = require('path')
// const bcrypt = require('bcrypt')
// const { GetUsers, GetLevels, PostUser, PostLevel } = require('../db/queries')

// router.get('/', async (req, res, next) => {
//   res.status(206).json({ message: '/api endpoint server is running' })
// })
// router.get('/users', async (req, res, next) => {
//   const result = await GetUsers()
//   // res.status(206).json({ users: result })
//   res.send({ users: result })
// })
// router.get('/levels', async (req, res, next) => {
//   const result = await GetLevels()
//   console.log(result, 'Result en levels')
//   // res.status(206).json({ users: result })
//   res.send({ levels: result })
// })

// router.post('/user', async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body

//     const saltRounds = 10
//     bcrypt.genSalt(saltRounds, async (err, salt) => {
//       if (err) {
//         return next(err)
//       }

//       bcrypt.hash(password, salt, async (err, passwordHashed) => {
//         if (err) {
//           return next(err)
//         }
//         const result = await PostUser(name, email, passwordHashed)
//         res.send({ message: 'User created successfully', details: result })
//       })
//     })
//     /* RETURNS A BOOLEAN INDICATING IF THE PASSWORDS ARE EQUAL */
//     // bcrypt.compare(password, hashedPassword (err, result) => {
//     // if (err) {
//     // Handle error comparing passwords
//     // return next(err)
//     // }
//     // if (result) {
//     // Passwords match, authentication successful
//     // return res.send({ password: hashedPassword })
//     // } else {
//     // Passwords don't match, authentication failed
//     // return next({ message: 'Passwords do not match' })
//     // return res.send({ password: hashedPassword })
//     // })
//   } catch (error) {
//     next(error)
//   }
// })
// router.post('/level', async (req, res, next) => {
//   try {
//     const { name } = req.body
//     const result = await PostLevel(name)
//     res.send({ message: 'Level created successfully', details: result })
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/data', async (req, res, next) => {
//   try {
//     const dataPath = path.join(__dirname, '../data/a1.json')
//     const rawData = fs.readFileSync(dataPath, 'utf8')
//     const obj = JSON.parse(rawData)
//     res.send(obj)


//     // const {
//     //   summary,
//     // } = req.body
//     // res.send(response)
//   } catch (error) {
//     next(error)
//   }
// })

// module.exports = router