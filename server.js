const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const Routes = require('./api/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entened: true}))


app.set("port", process.env.PORT || 3001);
const server = require('http').createServer(app);
const WebSocket = require('ws')
const wss = new WebSocket.Server({ server : server });

wss.on('connection', function(ws, req){
  console.log('a user connected')
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
    ws.send(Date.now());
  })

})
Routes(app);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

server.listen(app.get("port"), () => {
  console.log(`Find the server at:${server.address().port}/`); // eslint-disable-line no-console
});
