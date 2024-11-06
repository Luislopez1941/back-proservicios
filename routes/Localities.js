'use strict';

let express = require('express');
let LocalitiesController = require('../controllers/LocalitiesController');

let api = express.Router();
let auth =  require('../middlewares/authenticate')

api.get('/get_localities', LocalitiesController.getState);
api.get('/get_cities/:id_state', LocalitiesController.getCities);
api.get('/get_municipalities/:id_city', LocalitiesController.getMunicipalities);

module.exports = api;
