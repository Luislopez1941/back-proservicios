'use strict';

let Users = require('../models/User');
let Customer = require('../models/Customer');
let bcrypt = require('bcrypt')

async function users_registration(req, res) {
    let data = req.body

    let users_arr = await User.findOne({ where: { email: data.email } });
    let customer_arr = await Customer.findOne({ where: { email: data.email } });

    if(users_arr.length >= 1 || customer_arr.length >= 1) {
        res.status(200).send({status: 'warning', message: 'El correo ya se encuantra registrado', data: undefined})
    } else {
        if(data.password) {
            let hash = await bcrypt.hash(data.password, 10);
            if(hash) {
                data.password = hash;
                let reg = await Users.create(data);
                res.status(200).send({status: 'success', message: 'creado exitosamente', data: reg});
            };
            
        } else {
            res.status(200).send({status: 'warning', message: 'No hay una contraseña registrada'});
        }
    }
}

module.exports = {
    users_registration,
};
