const express = require("express");
const fs = require("fs");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entened: true}))

app.set("port", process.env.PORT || 3001);

// TODO MAKE ROUTES FILE
const mongodbSetup = require('./api/mongodb')
mongodbSetup.makeUniqueFields();
app.post('/api/users',mongodbSetup.postUser)
app.get('/api/users', mongodbSetup.getUsers)
app.get('/api/login', mongodbSetup.login)
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
