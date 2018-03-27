const db = require('../db')
const _ = require('lodash')

const animel1 = ['type', 'status', 'premiered', 'rating']
const animel2 = ['alt_name', 'producer', 'licensor', 'studio', 'genre']
let sqlQuery = ''
module.exports = {
  async index (req, res) {
    try {
      // console.log(req.query)
      let query = JSON.parse(req.query.query)
      if (query['name']) {
        sqlQuery = `SELECT DISTINCT
        anime_id, primary_name, type, num_episodes, start_date, rating, synopsis, pic_url
        FROM Anime NATURAL JOIN Anime_alt_name
        WHERE alt_name LIKE '%${query['name']}%'
        OR primary_name LIKE '%${query['name']}%';`
        console.log(sqlQuery, '\n\n')
        let data = await db.query(sqlQuery)
        res.send(data)
      } else {
        sqlQuery = `SELECT
        anime_id, primary_name, type, num_episodes, start_date, rating, synopsis, pic_url
        FROM Anime`
        let extras = []
        // console.log(query['rating'])
        if (query['rating'] && query['rating'].includes('violence and profanity')) {
          query['rating'] = 'R - 17+ (violence & profanity)'
        }
        if (query['rating'] && query['rating'].includes('Mild Nudity')) {
          query['rating'] = 'R+ - Mild Nudity'
        }
        animel1.map((keyName) => {
          if (query[keyName]) {
            extras.push(` ${keyName} = '${query[keyName]}'`)
          }
        })
        animel2.map((keyName) => {
          if (query[keyName]) {
            let values = query[keyName]
            if (typeof (values) !== 'object') {
              values = [values]
            }
            let keyFilter = values
              .map(value => `SELECT anime_id FROM Anime_${keyName} WHERE ${keyName} = '${value}'`)
              .reduce((acc, nxt) => `${nxt} AND anime_id in (${acc})`)
            extras.push(` anime_id IN (${keyFilter})`)
          // let fields = query.genre.map(each => `'${each}'`).join(', ')
          // extras.push(` genres in (${fields})`)
          }
        })
        let suffix = ''
        if (extras.length > 0) {
          suffix = extras.join(' AND')
          suffix = `WHERE ${suffix}`
        }
        if (query.offset || query.offset === 0) {
          suffix = `${suffix} LIMIT 50 OFFSET ${query.offset}`
        }
        sqlQuery = `${sqlQuery} ${suffix};`
        console.log(sqlQuery, '\n\n')
        let data = await db.query(sqlQuery)
        res.send(data)
      }
    } catch (err) {
      console.log(err)
      console.log(sqlQuery, '\n\n')
      res.status(500).send({
        error: 'an error has occured trying to fetch animes'
      })
    }
  },
  async show (req, res) {
    let anime = {}
    let animeId = req.params.animeId

    let q1 = `SELECT * FROM Anime WHERE anime_id = ${animeId}`
    console.log(q1, '\n\n')
    let l1data = await db.query(q1)

    q1 = `SELECT p.persona_id,
    p.primary_name AS persona_name,
    c.crew_id,
    c.full_name AS crew_name
    FROM  Anime a, Anime_persona ap, Persona p, Voice_actor va, Crew c
    WHERE a.anime_id = ${animeId}
    AND a.anime_id = ap.anime_id
    AND ap.persona_id = p.persona_id
    AND va.persona_id = p.persona_id
    AND c.crew_id = va.crew_id`
    console.log(q1, '\n\n')
    let pc = await db.query(q1)

    l1data[0]['persona_crew'] = pc
    _.extend(anime, l1data[0])
    for (let ind = 0; ind < animel2.length; ind++) {
      q1 = `SELECT
      ${animel2[ind]} FROM Anime_${animel2[ind]}
      WHERE anime_id = ${req.params.animeId}`
      console.log(q1, '\n\n')
      let l2data = await db.query(q1)

      let temp = {}
      temp[animel2[ind]] = []
      for (let ind2 = 0; ind2 < l2data.length; ind2++) {
        temp[animel2[ind]].push(l2data[ind2][animel2[ind]])
      }
      _.extend(anime, temp)
    }
    if (req.query.userId) {
      let userId = JSON.parse(req.query.userId)
      q1 = `SELECT progress, score, status FROM Watch
      WHERE user_id = ${userId} AND anime_id = ${animeId}`
      console.log(q1, '\n\n')
      let watch = await db.query(q1)

      anime['watch'] = watch[0]
      // console.log(anime)
    }
    res.send(anime)
  }
}
