const connection = require('./connection')

const GetUsers = async () => {
  const [rows] = await connection.execute('SELECT * FROM user')
  return rows
}
const GetLevels = async () => {
  const [rows] = await connection.execute('SELECT * FROM level')
  return rows
}
const GetTopics = async (level) => {
  const [rows] = await connection.execute('SELECT topics FROM level WHERE name = ?', [level])
  return rows
}
const PostUser = async (name, email, passwordHash) => {
  const [response] = await connection.execute('INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash])
  return response
}
// const PostLevel = async (name) => {
//   const [response] = await connection.execute('INSERT INTO level (name) VALUES (?)', [name])
//   return response
// }
const PostTopic = async (name, topic) => {
  const [response] = await connection.execute('UPDATE level SET topics = ? WHERE name = ?', [topic, name])
  return response
}

module.exports = {
  GetUsers,
  GetLevels,
  GetTopics,
  PostUser,
  // PostLevel,
  PostTopic
}
