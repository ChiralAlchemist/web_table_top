const MongoClient = require('mongodb').MongoClient,
assert = require('assert'),
co = require('co');
const dbUtils = require("./utils");
const url = "mongodb://jashby473:thedbpassword@ds036577.mlab.com:36577/jashbyblog";

const setupMongoDb = {
  makeUniqueFields: function () {
    co(function*() {
      var db = yield MongoClient.connect(url);
      var r = yield db.collection('users').createIndex({ 'username': 1 }, { unique: true } );
      db.close();
    })
  },
  getUsers: function (req, res) {
    co(function*() {
      var db = yield MongoClient.connect(url);
      var r = yield db.collection('users').find({}).toArray();
      db.close();
      res.json({
        res: r
      })
    })
    .catch(function(error) {
      console.log(error.stack);
    })
  },
  postUser: function (req, res) {
    const user = req.body
    co(function*() {
      var db = yield MongoClient.connect(url);
      console.log("connected to mongodb")
      var r = yield db.collection('users').insertOne(user)
      db.close();
      res.json({
        success: true,
        req: req.data
      })
    }).catch(function(error) {
      console.log(error.stack);
      if(error.name === "MongoError" && error.code === 11000){
        console.log('handled duplicate name error')
        return res.json({
          success: false,
          message: "duplicate username"
        })
      }
      return res.json({
        success: false,
        message: error.stack
      })
    })
  },
  login: function (req, res){
    var user = {
      username: req.query.username,
      password: req.query.password
    }
    console.log('http sent to login', user);
    co(function*() {
      var db = yield MongoClient.connect(url);
      var isExistingUser = yield db.collection('users').find(user).toArray();
      console.log(isExistingUser)
      if(isExistingUser.length) {
        return res.json({
          success: true,
          message: "successful login",
          user: isExistingUser[0]
        });
      } else {
        return res.json({
          success:false,
          message:"invailid username/password"
        })
      }
      db.close();
    }).catch(function(error) {
      console.log(error.stack);
    })
  }
}

module.exports = setupMongoDb;
