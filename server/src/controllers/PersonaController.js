const db = require('../db')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    let searchQuery = JSON.parse(req.query.query)
    let persona = await db.query(`SELECT * FROM Persona WHERE primary_name LIKE '%${searchQuery.name}%'`)
    res.send(persona)
  },
  async show (req, res) {
    let persona = {}
    let personaId = req.params.personaId
    let l1data = await db.query(`SELECT * FROM Persona WHERE persona_id = ${personaId}`)
    _.extend(persona, l1data[0])
    res.send(persona)
  }
}
