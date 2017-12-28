const MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
co = require('co');

const url = "mongodb://jashby473:thedbpassword@ds036577.mlab.com:36577/jashbyblog";
const imageOperations = {
  post : function (req, res) {
    co(function* () {
      var image = {
        type: "image",
        image: req.body.image
      }
      var db = yield MongoClient.connect(url);
      var r = yield db.collection('images').insertOne(image)
      db.close();
    })
    .catch(function (error){
      console.log(error.name)
    })
    res.json({
      sent: req.body
    })
  },
  get : function (req, res) {
    co(function* () {
      var db = yield MongoClient.connect(url);
      var images = yield db.collection('images').find({type:"image"}).toArray()
      db.close();
      res.json({
        images: images
      })
    })
    .catch(function (error){
      console.log(error.stack)
    })
  }
}

module.exports = imageOperations;
