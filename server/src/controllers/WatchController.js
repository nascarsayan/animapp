const db = require('../db')
module.exports = {
  async createOrUpdate (req, res) {
    const data = req.body
    const keys = Object.keys(data)
    keys.forEach(key => {
      if (!data[key]) {
        data[key] = 'NULL'
      }
    })
    const values = Object.values(data).map(val => `'${val}'`)
    const isPresentQuery = `SELECT * FROM Watch
    WHERE anime_id = ${data['anime_id']} AND user_id = ${data['user_id']}`
    // console.log(isPresentQuery, '\n\n')
    let isPresent = await db.query(isPresentQuery)
    if (isPresent.length === 0) {
      const sqlQuery = `INSERT INTO Watch (${keys.join(',')}) VALUES(${values.join(',')})`
      // console.log(sqlQuery, '\n\n')
      await db.query(sqlQuery)
      isPresent = await db.query(isPresentQuery)
    } else {
      const arr = []
      keys.forEach(key => {
        if (data[key]) {
          arr.push(` ${key} = '${data[key]}'`)
        }
      })
      const sqlQuery = `UPDATE Watch
      SET ${arr.join(',')}
      WHERE anime_id = ${data['anime_id']} AND user_id = ${data['user_id']}`
      // console.log(sqlQuery, '\n\n')
      await db.query(sqlQuery)
      isPresent = await db.query(isPresentQuery)
    }
    // console.log(isPresent, '\n\n')
    res.send(isPresent[0])
  }
}
