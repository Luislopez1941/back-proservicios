// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/dba'); // Asegúrate de que la ruta sea correcta

class User extends Sequelize.Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    second_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    first_surname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    second_last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    profilePhoto: {
        type: DataTypes.STRING(255),
        defaultValue: 'profil.png',
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dni: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    type_user: {
        type: DataTypes.STRING(50),
        defaultValue: 'User',
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});

// Sincronizar el modelo con la base de datos
const syncModels = async () => {
    await User.sync();
};

module.exports = { User, syncModels };
