const axios = require('axios');
const { Dog, Temperament } = require('../db');
require('dotenv').config();
const { URL, IMG } = process.env;


const getDogId = async (req, res) => {
    const { idRaza } = req.params;

    try {
                
        if (isNaN(idRaza)){
            const dogFromDB = await Dog.findOne({
                where: { id: idRaza },
                include: Temperament,
            });    

            const filterDogFromDB = {
                id: dogFromDB.id,
                image: dogFromDB.image,
                name: dogFromDB.name,
                height: dogFromDB.height,
                weight: dogFromDB.weight,
                years: dogFromDB.years,
                temperament: dogFromDB.Temperaments.map((temp) => temp.temperament)
            }               
            
            if (filterDogFromDB) return res.status(200).json(filterDogFromDB);   
        }

             

        const response = await axios.get(`${URL}/${idRaza}`);

        if (!response.data.id) return res.status(404).json({ error: 'Raza de perro no encontrada.' });

        const {
            id,
            reference_image_id,
            name,
            height: { metric: height },
            weight: { metric: weight },
            life_span: years,
            temperament,
        } = response.data;

        const img = `${IMG}/${reference_image_id}.jpg`

        const temperamentsDog = temperament
            ? temperament.split(',').map((temp) => temp.trim())
            : [];

        const dogData = {
            id,
            image: img,
            name,
            height,
            weight,
            years,
            temperament: temperamentsDog,
        };

        return res.status(200).json(dogData);
       


    } catch (error) {

        res.status(500).json({ error: 'Error al obtener el detalle de la raza de perro.' });
    }
}

module.exports = getDogId


