const axios = require('axios');
const { Temperament } = require('../db');
require('dotenv').config();
const { URL } = process.env;

const getTemperaments = async (req, res) => {
    try {

        let verify = await Temperament.findAll()

        if (!verify) {
        
            const response = await axios.get(URL);

            if (!response.data || response.data.length === 0) {
                return res.status(404).json({ error: 'No se encontraron temperamentos en la API.' });
            }

            const allTemperamentsSet = new Set( response.data
                 .flatMap((dog) => (dog.temperament ? dog.temperament.split(',').map((temp) => temp.trim()) : [])) );

            const allTemperaments = [...allTemperamentsSet];

            allTemperaments.map(async (temp) => {
             await Temperament.findOrCreate({ where: { temperament: temp } }); 
            })
            
             verify = await Temperament.findAll();
        
        }
        
        return res.status(200).json(verify);
        
    } catch ({error}) {
        
        return res.status(500).json({ error: 'Error al obtener y guardar los temperamentos.' });
    }
};

module.exports = getTemperaments;
