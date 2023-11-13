require('dotenv').config();
const { Sequelize } = require('sequelize');
const { ELEPHANTSQL_URL } = process.env;
// Importa los modelos
const DogFunction = require('./models/Dog');
const TemperamentFunction = require('./models/Temperament');

const sequelize = new Sequelize(ELEPHANTSQL_URL, {
  logging: false, native: false, dialectModule: require('pg')
});

// Inicializa los modelos
DogFunction(sequelize);
TemperamentFunction(sequelize);

const { Dog, Temperament } = sequelize.models;

// Define las relaciones entre los modelos
Dog.belongsToMany(Temperament, { through: 'dog_temp' });
Temperament.belongsToMany(Dog, { through: 'dog_temp' });

module.exports = {
  Dog,
  Temperament,
  conn: sequelize
};


