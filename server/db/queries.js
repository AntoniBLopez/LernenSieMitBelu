const connection =require('./connection')

const GetAllUsers = async ()  => {
  const { query } = await connection.execute('SELECT * FROM user')
  return query
}

module.exports = {
  GetAllUsers
}
