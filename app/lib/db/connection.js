const { createPool } = require('mysql2/promise')
// const path = require('path')
require('dotenv').config()

const connection = createPool({
  host: process.env.NODE_ENV === 'development' ? process.env.DEV_DB_HOST : process.env.DB_HOST,
  user: process.env.NODE_ENV === 'development' ? process.env.DEV_DB_USER : process.env.DB_USER,
  password: process.env.NODE_ENV === 'development' ? process.env.DEV_DB_PASSWORD : process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'development' ? process.env.DEV_DB_NAME : process.env.DB_NAME,
  port: process.env.NODE_ENV === 'development' ? process.env.DEV_DB_PORT : process.env.DB_PORT,
})


module.exports = connection

