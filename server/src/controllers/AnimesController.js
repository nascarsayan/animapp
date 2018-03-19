const db = require('../db')
const Song = require('../db')
const _ = require('lodash')

const animel2 = ['alt_name', 'producer', 'licensor', 'studio', 'genre']
let sqlQuery = ''
module.exports = {
  async index (req, res) {
    try {
      sqlQuery = `SELECT
      anime_id, primary_name, type, num_episodes, start_date, rating, synopsis, pic_url
      FROM Anime`
      let query = JSON.parse(req.query.query)
      let extras = []
      if (query.type) {
        extras.push(` type = '${query.type}'`)
      }
      if (query.status) {
        extras.push(` status = '${query.status}'`)
      }
      if (query.rating) {
        extras.push(` rating = '${query.rating}'`)
      }
      if (query.genre) {
        let genreFilter = query.genre
          .map(genre => `SELECT anime_id FROM Anime_genre WHERE genre = '${genre}'`)
          .reduce((acc, nxt) => `${nxt} AND anime_id in (${acc})`)
        extras.push(` anime_id IN (${genreFilter})`)
        // let fields = query.genre.map(each => `'${each}'`).join(', ')
        // extras.push(` genres in (${fields})`)
      }
      let suffix = ''
      if (extras.length > 0) {
        suffix = extras.join(' AND')
        suffix = `WHERE ${suffix}`
      }
      if (query.offset) {
        suffix = `${suffix} LIMIT 50 OFFSET ${query.offset}`
      }
      sqlQuery = `${sqlQuery} ${suffix};`
      let data = await db.query(sqlQuery)
      res.send(data)
    } catch (err) {
      console.log(err)
      console.log(sqlQuery)
      res.status(500).send({
        error: 'an error has occured trying to fetch animes'
      })
    }
  },
  async show (req, res) {
    let anime = {}
    let animeId = req.params.animeId
    let l1data = await db.query(`SELECT * FROM Anime WHERE anime_id = ${animeId}`)
    let pc = await db.query(`SELECT p.persona_id,
    p.primary_name AS persona_name,
    c.crew_id,
    c.full_name AS crew_name
    FROM  Anime a, Anime_persona ap, Persona p, Voice_actor va, Crew c
    WHERE a.anime_id = ${animeId}
    AND a.anime_id = ap.anime_id
    AND ap.persona_id = p.persona_id
    AND va.persona_id = p.persona_id
    AND c.crew_id = va.crew_id`)
    l1data[0]['persona_crew'] = pc
    _.extend(anime, l1data[0])
    for (let ind = 0; ind < animel2.length; ind++) {
      let l2data = await db.query(`SELECT
      ${animel2[ind]} FROM Anime_${animel2[ind]}
      WHERE anime_id = ${req.params.animeId}`)
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
