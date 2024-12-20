'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const openapiSpecification = require('./swagger/swagger.js'); // Cambia esto según tu estructura de carpetas
const { connectDB, sequelize } = require('./db/dba.js');

const port = process.env.PORT || 4000;
const app = express();

// Para JSON
app.use(bodyParser.json({ limit: 'Infinity' })); // Sin límite en el tamaño del cuerpo JSON

// Para URL-encoded
app.use(bodyParser.urlencoded({ limit: 'Infinity', extended: true })); // Sin límite en el tamaño del cuerpo URL-encoded


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// Rutas
const customerRouter = require('./routes/Customer.js');
// const administratorRouter = require('./routes/Administrator.js');
// const usersrRouter = require('./routes/Users.js');
const GeneralLoginRouter = require('./routes/GeneralLogin.js');
const consultsGeneral = require('./routes/ConsultsGeneral.js');
const localitiesRouter = require('./routes/Localities.js');

app.use('/api', customerRouter);
// app.use('/api', administratorRouter);
// app.use('/api', usersrRouter);
app.use('/api', GeneralLoginRouter);
app.use('/api', consultsGeneral);
app.use('/api', localitiesRouter);

// app.get('/', (req, res) => {
//     res.redirect('/api-docs');
// });
// Swagger
app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const startServer = async () => {
    try {
        await connectDB(); // Conectar a la base de datos
        await sequelize.sync(); // Sincroniza los modelos
        console.log('Models synchronized successfully');
        app.listen(port, () => { // Usar el puerto definido
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

startServer();