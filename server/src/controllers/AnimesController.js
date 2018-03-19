const db = require('../db')
const Song = require('../db')
const _ = require('lodash')

const animel2 = ['alt_name', 'producer', 'licensor', 'studio', 'genre']

module.exports = {
  async index (req, res) {
    try {
      let animes = []
      let batch = ''
      let offset = req.params.offset
      if (req.params.offset) {
        batch = ` LIMIT 50 OFFSET ${offset}`
      }
      let l1data = await db.query(`SELECT anime_id, primary_name, type, num_episodes, start_date, rating, synopsis FROM Anime${batch};`)
      _.extend(animes, l1data)
      res.send(animes)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch animes'
      })
    }
  },
  async show (req, res) {
    let anime = {}
    let l1data = await db.query(`SELECT * FROM Anime WHERE anime_id = ${req.params.animeId}`)
    _.extend(anime, l1data[0])
    for (let ind = 0; ind < animel2.length; ind++) {
      let l2data = await db.query(`SELECT ${animel2[ind]} FROM Anime_${animel2[ind]} WHERE anime_id = ${req.params.animeId}`)
      let temp = {}
      temp[animel2[ind]] = []
      for (let ind2 = 0; ind2 < l2data.length; ind2++) {
        temp[animel2[ind]].push(l2data[ind2][animel2[ind]])
      }
      _.extend(anime, temp)
    }
    res.send(anime)
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
