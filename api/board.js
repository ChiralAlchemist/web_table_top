const dbUtils = require('./utils.js');

var boardOperations = {
  get: function(req, res) {
    var boardName = req.params.name;
    dbUtils.findOnefield('boards', 'boardState',{fileName:boardName})
    .then(function (boardState) {
      res.json({
        boardState: boardState
      })
    })
  },
  getNames: function(req, res) {
    dbUtils.findOnefield('boards', 'fileName')
    .then(function(boardNames){
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
    dbUtils.addOrUpdate('boards',{'fileName': board.fileName}, board)
    .then(function(r){
      console.log(r)
      res.json({
        success: true,
        board: board
      })
    })
    .catch(function(error){
      console.log(error);
    })

  }
}

module.exports = boardOperations
