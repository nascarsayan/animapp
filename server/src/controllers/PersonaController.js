const db = require('../db')
const Song = require('../db')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      let animes = []
      let batch = ''
      let offset = req.params.offset
      if (req.params.offset) {
        batch = ` LIMIT 50 OFFSET ${offset}`
      }
      let l1data = await db.query(`SELECT
      anime_id, primary_name, type, num_episodes, start_date, rating, synopsis
      FROM Anime${batch};`)
      _.extend(animes, l1data)
      res.send(animes)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch animes'
      })
    }
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
