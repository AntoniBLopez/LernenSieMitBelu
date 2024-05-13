const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send({ message: 'Awesome api server!' })
})

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body
    res.send(code)
  } catch (error) {
    next(error)
  }
})

module.exports = router