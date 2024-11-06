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
    profilePhoto: {
        type: DataTypes.TEXT,
        allowNull: true, // O false dependiendo de si este campo puede ser nulo
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    skills: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    starts: {
        type: DataTypes.JSON,
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
        defaultValue: 'Customer',
        allowNull: true,
    },
    id_state: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'states',  // Nombre del modelo al que se relaciona
            key: 'id',      // Clave primaria del modelo de referencia
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    id_city: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'cities',  // Nombre del modelo al que se relaciona
            key: 'id',      // Clave primaria del modelo de referencia
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    id_municipality: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'municipalities',  // Nombre del modelo al que se relaciona
            key: 'id',      // Clave primaria del modelo de referencia
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
