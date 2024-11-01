'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/dba'); // Asegúrate de que la ruta a tu configuración de Sequelize sea correcta

class Administrator extends Model {}

Administrator.init({
    names: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surnames: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que el correo electrónico sea único
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile: {
        type: DataTypes.STRING,
        defaultValue: 'profil.png',
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'administrator',
        allowNull: true,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Administrator',
    tableName: 'administrators', // Especifica el nombre de la tabla en la base de datos
});

module.exports = Administrator;
