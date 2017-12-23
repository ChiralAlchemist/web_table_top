const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const Routes = require('./api/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({entened: true}))

console.log('start the logging')
app.set("port", process.env.PORT || 3001);
console.log('process.env.PORT', process.env.PORT)
const server = require('http').createServer(app);
const WebSocket = require('ws')
const wss = new WebSocket.Server({ server : server });

wss.on('connection', function(ws, req){
  console.log('a user connected')
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if(clientReady(client)){
        client.send(message)
      }
    })
    console.log('received: %s', message)
  })
  ws.on('close', function close() {
    wss.clients.forEach(function (client) {
      if(clientReady(client)){
        client.send('a user went offile ') // TODO say which user went offile
      }
    })
  })
  function clientReady(client) {
    return client !== ws && client.readyState === WebSocket.OPEN
  }
})
Routes(app);
console.log('made it here')
// Express only serves static assets in production
console.log("process.env.NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build/"));
}

server.listen(app.get("port"), () => {
  console.log(`Find the server at:${server.address().port}/`); // eslint-disable-line no-console
});
