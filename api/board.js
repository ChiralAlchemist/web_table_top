const dbUtils = require('./utils.js');

var boardOperations = {
  get: function() {

  },
  post: function(req, res) {
    console.log(req.body)

    var board = {
      boardState: req.body.boardState,
      fileName: req.body.fileName
    }
    dbUtils.addToCollection('boards', board)
    .then(function(r){
      console.log(r.ops)
    })
    .catch(function(error){
      console.log(error);
    })

  }
}

module.exports = boardOperations
