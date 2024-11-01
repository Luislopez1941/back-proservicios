'use strict';

let { Customer } = require('../models//Customer');
let { User } = require('../models/User');
let bcrypt = require('bcrypt')
let jwt = require('../helpers/jwt')

const general_login = async function (req, res) {
    let data = req.body
    let customers_arr = []
    let users_arr = []

    users_arr = await User.findOne({ where: { email: data.email } });
    customers_arr = await Customer.findOne({ where: { email: data.email } });


    if (users_arr || customers_arr) {
        let user = []
        if(users_arr) {
            user = users_arr
        } else {
            user = customers_arr
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
        res.status(200).send({ status: 'warning', message: 'El correo no esta registrado'})
    }
}

module.exports = {
    general_login,
};
