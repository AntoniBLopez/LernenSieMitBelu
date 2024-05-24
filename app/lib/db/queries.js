const connection = require('./connection')

const GetUsers = async () => {
  const [query] = await connection.execute('SELECT * FROM user')
  return query
}
const GetLevels = async () => {
  const [query] = await connection.execute('SELECT * FROM level')
  return query
}
const PostUser = async (name, email, passwordHash) => {
  const [query] = await connection.execute('INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash])
  return query
}
const PostLevel = async (name) => {
  const [query] = await connection.execute('INSERT INTO level (name) VALUES (?)', [name])
  return query
}

module.exports = {
  GetUsers,
  GetLevels,
  PostUser,
  PostLevel
}
