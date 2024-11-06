let { Customer } = require('../models/Customer');
let { User } = require('../models/User');
const { sequelize } = require('../db/dba');
const { Op } = require('sequelize');




const getUser = async function (req, res) {
    if (req.params) {
        const data = req.params;
        let user;
        try {
            if (data.type === 'Customer') {
                user = await Customer.findOne({ _id: data.id });
            } else if (data.type === 'User') {
                user = await User.findOne({ _id: data.id });
            }

            if (user) {
                return res.status(200).send({ data: user });
            } else {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error(error);  // Asegúrate de capturar el error
            return res.status(500).send({ message: 'Error al buscar el usuario', error });
        }
    } else {
        return res.status(403).send({ message: 'NoAccess' });
    }
};



const updateUser = async function (req, res) {
    let data = req.body;
    const id = req.params.id;

    if (req.params.id) {
        try {
            let user;
            if (data.type === 'Customer') {
                user = await Customer.findOne({ where: { id } });

                if (user) {
                    // Actualiza los campos necesarios
                    await user.update(data);

                    return res.status(200).send({ message: 'Usuario actualizado con éxito', data: user });
                } else {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }
            } else if (data.type === 'User') {
                user = await User.findOne({ where: { id } });

                if (user) {
                    await user.update(data);

                    return res.status(200).send({ message: 'Usuario actualizado con éxito', data: user });
                } else {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al actualizar el usuario', error });
        }
    } else {
        console.log('No hay parámetros');
    }
};

const customerSearch = async function(req, res) {
    let data = req.body;

    console.log(data); // Para ver el JSON recibido

    try {
        const queryFilters = {
            ...(data.id_state && { id_state: data.id_state }),
            ...(data.id_city && { id_city: data.id_city }),
            ...(data.id_municipality && { id_municipality: data.id_municipality }),
            ...(data.tipy_service && {
                skills: sequelize.literal(
                    `JSON_CONTAINS(skills, '{"skill": "${data.tipy_service}"}')`
                )
            })
        };

        let users = await Customer.findAll({
            where: queryFilters
        });

        if (users.length > 0) {
            return res.status(200).send({ message: 'Usuarios encontrados', data: users });
        } else {
            return res.status(404).send({ message: 'No se encontraron usuarios' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al buscar usuarios', error });
    }
};



module.exports = { customerSearch };



module.exports = {
    getUser,
    updateUser,
    customerSearch
};
