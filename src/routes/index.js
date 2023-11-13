const express = require('express');
const router = express.Router();
const getDogs = require('../controllers/getDogs'); 
const getDogId = require('../controllers/getDogId')
const getDogsBreed = require('../controllers/getDogsBreed')
const postDogs = require('../controllers/postDogs')
const getTemperaments = require('../controllers/getTemperaments')

router.get('/dogs', getDogs);
router.get('/dogs/:idRaza', getDogId);
router.get('/name', getDogsBreed);
router.post('/dogs', postDogs);
router.get('/temperament', getTemperaments)

module.exports = router;
