const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const Routes = require('./api/routes');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, entened: true}));



app.set("port", process.env.PORT || 3001);
const server = require('http').createServer(app);
const WebSocket = require('ws')
const wss = new WebSocket.Server({ server : server });

wss.on('connection', function(ws, req){
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if(clientReady(client)){
        client.send(message)
      }
    })
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

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

server.listen(app.get("port"), () => {
  console.log(`Find the server at:${server.address().port}/`); // eslint-disable-line no-console
});
