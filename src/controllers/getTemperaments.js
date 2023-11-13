const axios = require('axios');
const { Temperament } = require('../db');
require('dotenv').config();
const { URL } = process.env;

const getTemperaments = async (req, res) => {
    try {
        
        const response = await axios.get(URL);

        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ error: 'No se encontraron temperamentos en la API.' });
        }

        const allTemperaments = response.data
            .flatMap((dog) => (dog.temperament ? dog.temperament.split(',').map((temp) => temp.trim()) : [])) // combina todo los array resultantes
            .filter((temp, index, self) => self.indexOf(temp) === index); // Filtra elementos duplicados
  
        allTemperaments.map(async (temp) => {
             await Temperament.findOrCreate({ where: { temperament: temp } }); 
        })

        const temperamentsFromDB = await Temperament.findAll();

        return res.status(200).json(temperamentsFromDB);
    } catch ({error}) {
        
        return res.status(500).json({ error: 'Error al obtener y guardar los temperamentos.' });
    }
};

module.exports = getTemperaments;
