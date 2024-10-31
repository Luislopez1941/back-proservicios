'use strict';

let express = require('express');
let UsersController = require('../controllers/ControllerUsers');

let api = express.Router();

api.post('/users_registration', UsersController.users_registration);

module.exports = api;
