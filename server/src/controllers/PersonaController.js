const db = require('../db')
const Song = require('../db')
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
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the song'
      })
    }
  },
  async put (req, res) {
    try {
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the song'
      })
    }
  }
}
