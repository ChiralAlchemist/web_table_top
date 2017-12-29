const dbUtils = require('./utils.js');

var boardOperations = {
  get: function(req, res) {
    var boardName = req.params.name;
    dbUtils.findOnefield('boards', 'boardState',{fileName:boardName})
    .then(function (boardState) {
      console.log('boardState', boardState)
      res.json({
        boardState: boardState
      })
    })
  },
  getNames: function(req, res) {
    dbUtils.findOnefield('boards', 'fileName')
    .then(function(boardNames){
      console.log(boardNames)
      res.json({
        boardNames: boardNames})
    })
  },
  post: function(req, res) {
    // TODO ONLY ALLOW FOR ONE BS OF A GIVEN STATE
    var board = {
      type: "board",
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
