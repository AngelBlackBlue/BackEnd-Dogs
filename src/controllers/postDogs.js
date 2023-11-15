const { Dog, Temperament } = require('../db');

const postDogs = async (req, res) => {
    const { name, image, height, weight, years, temperament } = req.body;

    try {
        const dogData = {
            name,
            height,
            weight,
            years,
            image,
        };

        const missingData = Object.values(dogData).some((value) => !(value.trim()));
        if (missingData) {
            return res.status(400).json({ error: 'Faltan datos obligatorios.' });
        }

        const modifiedName = name.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")
            .trim();

        const temperamentsDog = temperament
            ? temperament.split(',').map((temp) => (temp.trim()))
                         .filter(element => element !== '')
            : [];
       
        if (temperamentsDog.length === 0 || temperamentsDog[0] === '') {
            return res.status(400).json({ error: 'Debe proporcionar al menos un temperamento.' });
        }

        const tempChart = temperamentsDog.map((temp) => temp.charAt(0).toUpperCase() + temp.slice(1).toLowerCase());
        const tempClear = [...new Set(tempChart)];                          

        const createdTemperaments = await Promise.all(
            tempClear.map(async (temp) => {
                const [createdTemperament] = await Temperament.findOrCreate({
                    where: { temperament: temp },
                });
                return createdTemperament;
            })
        );

        const createdDog = await Dog.create({
            name: modifiedName,
            image,
            height,
            weight,
            years,
       });

        await createdDog.setTemperaments(createdTemperaments);

        return res.status(201).json(createdDog);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear el perro.' });
    }
};

module.exports = postDogs;

