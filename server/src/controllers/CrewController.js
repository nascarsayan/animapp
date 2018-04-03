const db = require('../db')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    let searchQuery = JSON.parse(req.query.query)
    const q1 = `SELECT * FROM Crew WHERE full_name LIKE '%${searchQuery.name}%'`
    // console.log(q1, '\n\n')
    let crew = await db.query(q1)
    res.send(crew)
  },
  async show (req, res) {
    let crew = {}
    let crewId = req.params.crewId
    const q1 = `SELECT * FROM Crew WHERE crew_id = ${crewId}`
    // console.log(q1, '\n\n')
    let l1data = await db.query(q1)
    _.extend(crew, l1data[0])
    res.send(crew)
  }
}
