const jwt = require('jsonwebtoken')
const config = require('../config/config')
const db = require('../db')

function jwtSignUser (user) {
  // const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret)
}

module.exports = {
  async register (req, res) {
    try {
      let sqlQuery = `INSERT INTO User(email, password) VALUES ('${req.body.email}', '${req.body.password}')`
      // console.log(sqlQuery, '\n\n')
      await db.query(sqlQuery)
      let user = await db.query(`SELECT * FROM User WHERE email = '${req.body.email}'`)
      user = user[0]
      let userJson = JSON.stringify(user)
      res.send({
        user: user,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      let user = await db.query(`SELECT * FROM User WHERE email = '${email}' AND password = '${password}'`)
      if (user.length === 0) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      user = user[0]
      let userJson = JSON.stringify(user)
      res.send({
        user: user,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}
