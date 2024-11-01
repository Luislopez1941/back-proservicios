const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/dba'); // Asegúrate de que la ruta sea correcta

class Customer  extends Sequelize.Model {}

Customer .init({
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
    profile: {
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
    modelName: 'Customer',
    tableName: 'customers', // Asegúrate de que este sea el nombre correcto de tu tabla
    timestamps: false,
});

// Sincronizar el modelo con la base de datos
const syncModels = async () => {
    await Customer.sync();
};

module.exports = { Customer, syncModels };
