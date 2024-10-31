let Customer = require('../models/Customer');
let Users = require('../models/Users');

const getUser = async function (req, res) {
    if (req.params) {
        const data = req.params;
        let user;
        try {
            if (data.type === 'Customer') {
                user = await Customer.findOne({ _id: data.id });
            } else if (data.type === 'User') {
                user = await Users.findOne({ _id: data.id });
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
    const _id = req.params.id;

    if (req.params.id) {
        try {
            let user;
            if (data.type === 'Customer') {
                user = await Customer.findByIdAndUpdate(_id, data, { new: true });
                if(user) {
                    return res.status(200).send({ message: 'Usuario actualizado con éxito', data: user });
                } else {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }
            } else if (data.type === 'User') {
                user = await Users.findByIdAndUpdate(_id, data, { new: true });
                if(user) {
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
        console.log('No hay parametros')
    }
};

module.exports = {
    getUser,
    updateUser
};
