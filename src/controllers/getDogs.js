const axios = require('axios');
require('dotenv').config();
const { Dog, Temperament } = require('../db');
const { URL, IMG } = process.env;

const getDogs = async (req, res) => {
    try {

        const dogsFromDB = await Dog.findAll({
             include: Temperament,
        });

        const filterDogsFromDB = dogsFromDB
            .map((dog) => ({
                id: dog.id,
                image: dog.image,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                years: dog.years,
                temperament: dog.Temperaments? dog.Temperaments.map((temp) => temp.temperament) : [],
            }));        

        const response = await axios.get(URL);
        const breedList = response.data
            .map((dog) => {
                return {
                    id: dog.id,
                    image: `${IMG}/${dog.reference_image_id}.jpg`,
                    name: dog.name,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    years: dog.life_span,
                    temperament: dog.temperament ? dog.temperament.split(',').map((temp) => temp.trim()) : [],
                };
            })

        const dogs = [...filterDogsFromDB, ...breedList]    

        return res.status(200).json(dogs);

    } catch (error) {

        return res.status(500).json({ error: 'Error al obtener las razas de perros.' });
    }
}

module.exports = getDogs


