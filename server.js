const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect("mongodb://jashby473:thedbpassword@ds036577.mlab.com:36577/jashbyblog");
const mongooseC = mongoose.connection;
mongooseC.on('error', console.error.bind(console, 'connection errror:'));
mongooseC.once('open', function () {
  console.log('Connected to mLab')
})

const User = require('./db/schema/users')
// var me  =  new User({
//   name: "Joe",
//   password: "password"
// })

// me.save(function (err, me) {
//   if(err) return console.log(err);
//   console.log("it worked?")
// })
User.find({name: "Joe"}, function (user, err) {
  console.log("found user", user, err)
})
// app.get("/api/food", (req, res) => {
//   const param = req.query.q;
//
//   if (!param) {
//     res.json({
//       error: "Missing required parameter `q`"
//     });
//     return;
//   }



app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
