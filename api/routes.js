const mongodbSetup = require('./mongodb')
function registerRoutes (app) {
  mongodbSetup.makeUniqueFields();
  app.post('/api/users',mongodbSetup.postUser)
  app.get('/api/users', mongodbSetup.getUsers)
  app.get('/api/login', mongodbSetup.login)
}

module.exports = registerRoutes;
