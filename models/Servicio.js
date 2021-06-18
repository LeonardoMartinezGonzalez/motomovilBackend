const mongoose = require('mongoose');

const ServiciosSchema = mongoose.Schema({
    numeroSolicitud: {
        type: String,
        require: true
    },
    usuarioSolicitante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaSolicitud: {
        type: Date,
        default: Date.now()
    },
    lugarPartida:{
        type: String,
        require: true,
        trim: true
    },
    lugarDestino:{
        type: String,
        require: true,
        trim: true
    },
    distancia:{
        type: String,
        require: true
    },
    tiempoEstimado:{
        type: String,
        require: true
    } 
});

module.exports = mongoose.model('Servicio', ServiciosSchema);