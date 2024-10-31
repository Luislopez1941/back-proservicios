'use strict';

let Customer = require('../models//Customer');
let Users = require('../models/Users');
let bcrypt = require('bcrypt')
let jwt = require('../helpers/jwt')

const general_login = async function (req, res) {
    let data = req.body
    let customers_arr = []
    let users_arr = []

    users_arr = await Users.find({ email: data.email })
    customers_arr = await Customer.find({ email: data.email })
    if (users_arr.length >= 1 || customers_arr.length >= 1) {
        let user = []
        if(users_arr.length >= 1) {
            user = users_arr[0]
        } else {
            user = customers_arr[0]
        }

        const match = await bcrypt.compare(data.password, user.password);
        if (match) {
            // Contraseña correcta
            return res.status(200).send({ status: 'success', message: 'Inicio de sesión exitoso', data: user, token: jwt.createToken(user) });
        } else {
            // Contraseña incorrecta
            return res.status(200).send({ status: 'warning', message: 'La contraseña no coincide' });
        }
    } else {
        res.status(200).send({ status: 'warning', message: 'El correo no esta registrado' })
    }
}

module.exports = {
    general_login,
};
