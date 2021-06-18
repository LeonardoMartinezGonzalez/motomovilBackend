const { gql } = require('apollo-server');


const typeDefs = gql`

    type todosCamposDeServicios {
        numeroSolicitud: String
        lugarPartida: String
        lugarDestino: String
        distancia: String
        tiempoEstimado: String
        id: ID
    }

    type Servicio {
        numeroSolicitud: String
        id: ID
    }

    type Usuario {
        nombre: String
        apellidos: String
        numeroTelefono: String
        correo: String
        id: ID
    }

    type Query {
        obtenerServicios : [todosCamposDeServicios]

        obtenerUsuarios : [Usuario]
    }

    type Token {
        token: String
    }

    input UsuarioInput {
        nombre: String!
        apellidos: String!
        numeroTelefono: String!
        correo: String!
        password: String!
    }

    input AutenticarInput {
        correo: String!
        password: String!
    }

    input ServicioInput {
        numeroSolicitud: String!
        lugarPartida: String!
        lugarDestino: String!
        distancia: String!
        tiempoEstimado: String!
    }

    type Mutation {
        # Usuarios
        crearUsuario(input: UsuarioInput) : String
        autenticarUsuario(input: AutenticarInput) : Token

        # servicios
        crearServicio(input: ServicioInput): Servicio
    }
`;



module.exports = typeDefs;