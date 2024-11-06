'use strict';

let { Customer } = require('../models/Customer');
let bcrypt = require('bcrypt')
let jwt = require('../helpers/jwt')

const customer_login = async function(req, res) {
    let data = req.body

    let customer_arr = await Customer.findOne({ where: { email: data.email } });

    if(customer_arr.length >= 1) {
        let user = customer_arr[0]
        const match = await bcrypt.compare(data.password, user.password);
        if (match) {
            // Contraseña correcta
            return res.status(200).send({ status: 'success', message: 'Inicio de sesión exitoso', data: user, token: jwt.createToken(user)});
        } else {
            // Contraseña incorrecta
            return res.status(200).send({ status: 'warning', message: 'La contraseña no coincide' });
        }
    } else {
        res.status(200).send({status: 'warning', message: 'El correo no esta registrado'})
    }
}

const customer_registration = async function(req, res) {
    let data = req.body

    console.log(data)

    let customer_arr = await Customer.findOne({ where: { email: data.email } });

    if(customer_arr) {
        res.status(200).send({status: 'warning', message: 'El correo ya se encuantra registrado', data: undefined})
    } else {
        if(data.password) {
            let hash = await bcrypt.hash(data.password, 10);
            if(hash) {
                data.password = hash;
                let reg = await Customer.create(data);
                return res.status(200).send({status: 'success', message: 'creado exitosamente', data: reg});
            };
            
        } else {
            return res.status(200).send({status: 'warning', message: 'No hay una contraseña registrada'});
        }
    }
}





const administrator_customer_registration = async (req, res) => {
    if(req.user) {
        if(req.user.rol == 'administrator') {
            let data = req.body;
            let reg = await Customer.create(data);
            res.status(200).send({ status: 'success', message: 'Usuario creado exitosamente', data: reg });
        }
    }
}

module.exports = {
    // customer_login,
    customer_registration,
    // list_customers,
    // administrator_customer_registration
};
