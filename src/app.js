const http = require('node:http');
const express = require('express')
const routesCrypto = require('./routers/routerCrypto')
const routesFront = require('./routers/routerFront')
const hostname = '127.0.0.1';
const port = 38080;
const app = express()

app.use(express.json())

app.use('/v1', routesCrypto)
app.use('/', routesFront)

const server = http.createServer(app)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})