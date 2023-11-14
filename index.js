require('dotenv').config();
const server = require('./src/app');
const { conn } = require('./src/db');
const { PORT } = process.env;



server.listen(PORT, () => {

  console.log(`Server on port: ${PORT}`)

  conn.sync({ force: false });

});
