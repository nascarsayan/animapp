const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AnimeController = require('./controllers/AnimeController')
const PersonaController = require('./controllers/PersonaController')
const CrewController = require('./controllers/CrewController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.get('/animes',
    AnimeController.index)
  app.get('/anime/:animeId',
    AnimeController.show)
  app.get('/personas',
    PersonaController.index)
  app.get('/persona/:personaId',
    PersonaController.show)
  app.get('/crews',
    CrewController.index)
  app.get('/crew/:crewId',
    CrewController.show)
}
