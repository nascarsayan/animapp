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
    let crew = {}
    let crewId = req.params.crewId
    let l1data = await db.query(`SELECT * FROM Crew WHERE crew_id = ${crewId}`)
    _.extend(crew, l1data[0])
    res.send(crew)
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
