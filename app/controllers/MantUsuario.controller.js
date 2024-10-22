const db = require('../config/db.config.js');
const Usuario = db.usuario;
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    const { nombre, area } = req.body;

    // Define las contraseñas para cada área
    let password;
    if (area === 'administrador') {
        password = '54321'; // Contraseña fija para administradores
    } else if (area === 'empleado') {
        password = '123'; // Contraseña fija para empleados
    } else {
        return res.status(400).json({
            message: "Área inválida. Debe ser 'administrador' o 'empleado'."
        });
    }

    // Encripta la contraseña antes de almacenarla
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        let usuario = {
            nombre: nombre,
            area: area,
            password: hashedPassword // Guarda la contraseña encriptada
        };

        const result = await Usuario.create(usuario);
        res.status(200).json({
            message: "Usuario creado con éxito con id = " + result.id_usuario,
            usuario: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};

exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                message: "Usuarios obtenidos con éxito",
                usuarios: usuarios
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los usuarios",
                error: error
            });
        });
};

exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (usuario) {
                res.status(200).json({
                    message: "Usuario obtenido con éxito con id = " + usuarioId,
                    usuario: usuario
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el usuario con id = " + usuarioId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el usuario",
                error: error
            });
        });
};
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};