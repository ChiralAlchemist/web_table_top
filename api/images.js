const MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
co = require('co');

const url = "mongodb://jashby473:thedbpassword@ds036577.mlab.com:36577/jashbyblog";
const imageOperations = {
  post : function (req, res) {
    co(function* () {
      var image = req.body
      var db = yield MongoClient.connect(url);
      var r = yield db.collection('images').insertOne(image)
    })
    .catch(function (error){
      console.log(error.name)
    })
    res.json({
      sent: req.body
    })
  },
  get : function (req, res) {
    res.send('route need to be setup')
  }
}

module.exports = imageOperations;
