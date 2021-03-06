const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellidos: {
        type: String,
        require: true,
        trim: true
    },
    numeroTelefono: {
        type: String,
        require: true,
        trim: true
    },
    correo: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Usuario', UsuariosSchema);