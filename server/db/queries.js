const connection =require('./connection')

const items = async ()  => {
  const { query } = await connection.execute('SELECT * FROM user')
  console.log(await items())
  return query
}
