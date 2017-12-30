const users = require('./users.js');
const images = require('./images');
const board = require('./board');
function registerRoutes (app) {
  users.makeUniqueFields();
  app.get('/api/boards/:name', board.get);
  app.get('/api/boardNames', board.getNames);
  app.post('/api/boards',board.post);
  app.get('/api/images', images.get);
  app.post('/api/images',images.post);
  app.get('/api/login', users.login);
  app.get('/api/users', users.getUsers);
  app.post('/api/users',users.postUser);
}

module.exports = registerRoutes;
