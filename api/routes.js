const mongodbSetup = require('./mongodb');
const images = require('./images');
const board = require('./board');
function registerRoutes (app) {
  mongodbSetup.makeUniqueFields();
  app.get('/api/boards/:name', board.get);
  app.get('/api/boardNames', board.getNames);
  app.post('/api/boards',board.post);
  app.get('/api/images', images.get);
  app.post('/api/images',images.post);
  app.get('/api/login', mongodbSetup.login);
  app.get('/api/users', mongodbSetup.getUsers);
  app.post('/api/users',mongodbSetup.postUser);
}

module.exports = registerRoutes;
