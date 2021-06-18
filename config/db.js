const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' }); 

const conectarDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Base de datos conectada');
    }
    catch (error) {
        console.log('Hubo un error de conexion a la BD');
        console.log(eror);
        process.exit(1); //detener la App
    }
}

module.exports = conectarDB;