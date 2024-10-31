'use strict';

let express = require('express');
let ControllerConsultsGeneral = require('../controllers/ControllerConsultsGeneral');

let api = express.Router();

api.get('/get_user/:type/:id/', ControllerConsultsGeneral.getUser);
api.put('/update_user/:type/:id', ControllerConsultsGeneral.updateUser);

module.exports = api;
