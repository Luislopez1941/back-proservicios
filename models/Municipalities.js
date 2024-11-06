const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/dba'); // Asegúrate de que la ruta sea correcta

class Municipalities extends Sequelize.Model { }

Municipalities.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    id_city: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cities', // Nombre de la tabla a la que hace referencia
            key: 'id',       // Columna en la tabla states
        },
        onDelete: 'CASCADE', // Elimina las ciudades asociadas si se elimina el estado
        onUpdate: 'CASCADE', // Actualiza el campo en cascada si se modifica el estado
    },
}, {
    sequelize,
    modelName: 'Municipalities',
    tableName: 'municipalities', // Asegúrate de que este sea el nombre correcto de tu tabla
    timestamps: false,
});

// Sincronizar el modelo con la base de datos
const syncModels = async () => {
    await Municipalities.sync();
};

module.exports = { Municipalities, syncModels };
