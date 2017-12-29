const MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
co = require('co');

const url = "mongodb://jashby473:thedbpassword@ds036577.mlab.com:36577/jashbyblog";
const utils = {
  connectToMDB: function () {
    return MongoClient.connect(url);
  },
  findOnefield: function(collection, field, doc={}){
    return co(function* () {
      var db = yield utils.connectToMDB();
      var queryObj = {};
      queryObj[field] = 1
      var queryResult = yield db.collection(collection).find(doc, queryObj).toArray()
      return queryResult;
    })
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
