const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const Routes = require('./api/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entened: true}))

app.set("port", process.env.PORT || 3001);

Routes(app);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
