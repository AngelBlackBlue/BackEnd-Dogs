const express = require('express')
const server = express()
const routers = require('./routes/index')
const cors = require('cors')


server.use(express.json())
server.use(cors());
server.use('/', routers)

module.exports = server



