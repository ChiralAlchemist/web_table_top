const mongodbSetup = require('./mongodb');
const images = require('./images');
function registerRoutes (app) {
  mongodbSetup.makeUniqueFields();
  app.get('/api/images', images.get)
  app.post('/api/images',images.post)
  app.post('/api/users',mongodbSetup.postUser)
  app.get('/api/users', mongodbSetup.getUsers)
  app.get('/api/login', mongodbSetup.login)
}

module.exports = registerRoutes;
