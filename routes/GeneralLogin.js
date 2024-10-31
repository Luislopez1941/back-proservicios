'use strict';

let express = require('express');
let GeneralLoginController = require('../controllers/generalLogin');

let api = express.Router();

api.post('/general_login', GeneralLoginController.general_login);

module.exports = api;
