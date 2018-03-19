const bluebird = require('bluebird')
module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'anime',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    host: process.env.HOST || 'localhost',
    Promise: bluebird,
    multipleStatements: true
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
