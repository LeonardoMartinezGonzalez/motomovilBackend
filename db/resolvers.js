const { delegateToSchema } = require('apollo-server');
const Usuario = require('../models/Usuario');
const Servicio = require('../models/Servicio');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' }); // siempre utilizar la ruta: variables.env

//Crea y firma un jsonwebtoken
const crearToken = (usuario,secreta,expiresIn) => {
  //console.log(usuario);
  const { id, correo, nombre } = usuario;
  return jwt.sign( { id, correo, nombre }, secreta, { expiresIn } );

}

const resolvers = {
    Query: {
        obtenerServicios: async (_,{}, ctx ) => {
          const servicios = await Servicio.find({ usuarioSolicitante: ctx.usuario.id});
        
          return servicios;
      }
      
    },
    Mutation: {
      crearUsuario: async (_, {input}) => {
          const { correo, password } = input;

          const existeUsuario = await Usuario.findOne({ correo });

          // Si el usuario existe
          if (existeUsuario){
            throw new Error('El usuario ya esta registrado');
          }

          try {
            //Encriptar el password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            //console.log(input);

            //Registrar nuevo usuario
            const nuevoUsuario = new Usuario(input);
            console.log(nuevoUsuario);
            //Guardarlo en la base de delegateToSchema
            nuevoUsuario.save();
            return "Usuario registrado con éxito";
          } catch (error) {
            console.log(error);
          }
      },
      autenticarUsuario: async (_, { input } ) => {
        const { correo, password } = input;
        //Si existe el usuario existe
        const existeUsuario = await Usuario.findOne({ correo });
        if (!existeUsuario){
          throw new Error('El usuario NO existe');
        }

        //Revisar si el password es correcto
        const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
        if(!passwordCorrecto){
          throw new Error("Contraseña incorrecta");
        }

        //Dar acceso a la APP
        return {
          token: crearToken(existeUsuario, process.env.SECRETA, '4hr')
        }
      },
      crearServicio: async (_, { input }, ctx ) => {  
       // console.log(ctx.id);
        try {
          const servicio = new Servicio(input);
          //Asociar el Usuario que solicita el servicio
          servicio.usuarioSolicitante = ctx.usuario.id; //pasado a traves del ctx

          //Almacenarlo en la base de datos
          const resultado = await servicio.save();
          return resultado; // Objeto de tipo servicio que regresa

        } catch (error) {
          console.log(error);
        }
      }

    }
}

module.exports = resolvers;
