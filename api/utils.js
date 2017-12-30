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
      db.close();
      return queryResult;
    })
  },
  findAll: function(collection, doc={}) {
    return co(function* () {
      var db = yield utils.connectToMDB();
      var resultArr = yield db.collection(collection).find(doc).toArray();
      db.close();
      return resultArr;
    })
  },
  addToCollection: function(collection, Obj) {
    return co(function* () {
      var db = yield utils.connectToMDB()
      var r = yield db.collection(collection).insertOne(Obj)
      db.close()
      return r
    })
  },
  addOrUpdate: function(collection, queryFields, doc) {
    return co(function* () {
      var db = yield utils.connectToMDB()
      var options = {upsert:true, w:1}
      var r = yield db.collection(collection).updateOne(queryFields, doc,options);
      db.close()
      return r
    })
  },
  makeFieldUnique: function (collection, field) {
    co(function*() {
      var db = yield utils.connectToMDB();
      var fieldObj = {};
      fieldObj[field] = 1;
      var r = yield db.collection('users').createIndex(fieldObj, { unique: true } );
      db.close();
    })
  }
}
module.exports = utils;
