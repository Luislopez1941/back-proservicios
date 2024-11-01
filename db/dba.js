const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize con tus credenciales de conexión
const sequelize = new Sequelize('railway', 'root', 'cHOKeUyCAUhqhdeIoJoTOFVgOltqSnHo', {
    host: 'autorack.proxy.rlwy.net',
    dialect: 'mysql',
    port: 15891,
    define: {
        timestamps: false, // Configuración global para todos los modelos
    },
});

// Método para probar la conexión
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connectDB(); // Asegúrate de llamar a este método

module.exports = { sequelize, connectDB };
