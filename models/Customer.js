'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const SchemaCustomer = Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: false },
    firstSurname: { type: String, required: true },
    secondLastName: { type: String, required: false },
    description: { type: String, required: false },
    country: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, default: 'profil.png', required: false },
    phone: { type: String, required: true },
    gender: { type: String, required: false },
    birthdate: { type: String, required: false },
    dni: { type: String, required: false },
    typeUser: { type: String, default: 'Customer', required: false },
});

module.exports = mongoose.model('Customer', SchemaCustomer);