const db = require('../db')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    let searchQuery = JSON.parse(req.query.query)
    const q1 = `SELECT * FROM Persona WHERE primary_name LIKE '%${searchQuery.name}%'`
    // console.log(q1, '\n\n')
    let persona = await db.query(q1)
    res.send(persona)
  },
  async show (req, res) {
    let persona = {}
    let personaId = req.params.personaId
    const q1 = `SELECT * FROM Persona WHERE persona_id = ${personaId}`
    // console.log(q1, '\n\n')
    let l1data = await db.query(q1)
    _.extend(persona, l1data[0])
    res.send(persona)
  }
}
