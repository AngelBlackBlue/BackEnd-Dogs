const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db');
require('dotenv').config();
const { URL, IMG } = process.env;

const getDogsBreed = async (req, res) => {
    const { name } = req.query;

    try {

        if (!name.length) return res.status(404).json({ error: 'Ingreso una raza' })

        const dogsFromDB = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: 
            [
                {
                    model: Temperament,
                    // attributes: ['temperament'],
                    // through: { attributes: [] }, 
                },
            ],

        });

        const filterDogsFromDB = dogsFromDB
            .map((dog) => ({
                id: dog.id,
                image: dog.image,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                years: dog.years,
                temperament: dog.Temperaments.map((temp) => temp.temperament),
            }));


        const response = await axios.get(URL);

        const filteredData = response.data
            .filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
            .map((dog) => ({
                id: dog.id,
                image: `${IMG}/${dog.reference_image_id}.jpg`,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                years: dog.life_span,
                temperament: dog.temperament ? dog.temperament.split(',').map((temp) => temp.trim()) : [],
            }));

        const dogs = [...filterDogsFromDB, ...filteredData];


        if (dogs.length === 0) {
            return res.status(404).json({ error: 'No se encontraron razas de perro con ese nombre.' });
        }
        return res.status(200).json(dogs);

    } catch (error) {

        return res.status(500).json({ error: 'Error al buscar razas de perro por nombre.' });
    }
};

module.exports = getDogsBreed
