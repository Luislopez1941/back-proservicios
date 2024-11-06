const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/dba'); // Asegúrate de que la ruta sea correcta

class State extends Sequelize.Model { }

State.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'State',
    tableName: 'States', // Asegúrate de que este sea el nombre correcto de tu tabla
    timestamps: false,
});

// Sincronizar el modelo con la base de datos
const syncModels = async () => {
    await State.sync();
};

module.exports = { State, syncModels };
