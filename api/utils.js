const MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
co = require('co');

const url = "mongodb://jashby473:thedbpassword@ds036577.mlab.com:36577/jashbyblog";
const utils = {
  connectToMDB: function () {
    return MongoClient.connect(url);
  },
  addToCollection: function(collection, Obj) {
    return co(function* () {
      var db = yield utils.connectToMDB()
      var r = yield db.collection(collection).insertOne(Obj)
      return r
    })
  }
}
module.exports = utils;
