'use strict';
const { State } = require('../models/State');
const { Cities } = require('../models/Cities');
const { Municipalities } = require('../models/Municipalities');


const getState = async function (req, res) {
 
    let states = await State.findAll();

    if (states.length > 0) {
        return res.status(200).send({ status: 'success', message: 'Estados obtenidos exitosamente', data: states });
    } else {
        return res.status(200).send({ status: 'warning', message: 'No hay estados' });
    }
}



const getCities = async function (req, res) {
    const { id_state } = req.params;
    let cities = await Cities.findAll({
        where: { id_state: id_state }
    });
    
    if (cities.length > 0) {
        return res.status(200).send({ status: 'success', message: 'Ciudades obtenidas exitosamente', data: cities });
    } else {
        return res.status(200).send({ status: 'warning', message: 'No hay ciudades' });
    }
}

const getMunicipalities = async function (req, res) {
    const { id_city } = req.params;
    console.log(id_city)
    let municipalities = await Municipalities.findAll({
        where: { id_city: id_city }
    });
     
    if (municipalities.length > 0) {
        return res.status(200).send({ status: 'success', message: 'Ciudades obtenidas exitosamente', data: municipalities });
    } else {
        return res.status(200).send({ status: 'warning', message: 'No hay ciudades' });
    }
}




module.exports = {
    getState,
    getCities,
    getMunicipalities
};
