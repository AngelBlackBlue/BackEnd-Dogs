const express = require('express')
const server = express()
const routers = require('./routes/index')
const cors = require('cors')


server.use(express.json())
server.use(cors({origin: 'https://pi-dog-main-git-main-angelblackblue.vercel.app'}));
server.use('/', routers)

module.exports = server



