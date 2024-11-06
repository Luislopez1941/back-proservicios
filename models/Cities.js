const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/dba'); // Asegúrate de que la ruta sea correcta

class Cities extends Sequelize.Model { }

Cities.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    id_state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'states', // Nombre de la tabla a la que hace referencia
            key: 'id',
        },
        onDelete: 'CASCADE', // Elimina las ciudades asociadas si se elimina el estado
        onUpdate: 'CASCADE', // Actualiza el campo en cascada si se modifica el estado
    },
}, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities', // Asegúrate de que este sea el nombre correcto de tu tabla
    timestamps: false,
});

// Sincronizar el modelo con la base de datos
const syncModels = async () => {
    await Cities.sync();
};

module.exports = { Cities, syncModels };
