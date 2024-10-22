const db = require('../config/db.config.js');
const Cliente = db.Clientes;

exports.create = (req, res) => {
    let cliente = {};

    try {
        cliente.nombres_cliente = req.body.nombres_cliente;
        cliente.apellidos_cliente = req.body.apellidos_cliente;
        cliente.edad_cliente = req.body.edad_cliente;
        cliente.dpi = req.body.dpi;
        cliente.fecha_nacimiento = req.body.fecha_nacimiento;
        cliente.sexo = req.body.sexo;
        cliente.correo_electronico = req.body.correo_electronico;
        cliente.telefono = req.body.telefono;
        cliente.direccion = req.body.direccion;

        Cliente.create(cliente).then(result => {
            res.status(200).json({
                message: "Cliente creado con éxito con id = " + result.id_cliente,
                cliente: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el cliente",
            error: error.message
        });
    }
};

exports.retrieveAllClientes = (req, res) => {
    Cliente.findAll()
        .then(clientes => {
            res.status(200).json({
                message: "Clientes obtenidos con éxito",
                clientes: clientes
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los clientes",
                error: error
            });
        });
};

exports.getClienteById = (req, res) => {
    let clienteId = req.params.id;
    Cliente.findByPk(clienteId)
        .then(cliente => {
            res.status(200).json({
                message: "Cliente obtenido con éxito con id = " + clienteId,
                cliente: cliente
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el cliente",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                message: "No se encontró el cliente con id = " + clienteId,
                cliente: "",
                error: "404"
            });
        }

        // Verificar si el DPI ha cambiado
        if (req.body.dpi && req.body.dpi !== cliente.dpi) {
            // Buscar si el nuevo DPI ya está en uso por otro cliente (excluir el cliente actual)
            const existingDpi = await Cliente.findOne({
                where: { dpi: req.body.dpi, id_cliente: { [db.Sequelize.Op.ne]: clienteId } }  // Excluir al cliente actual
            });

            if (existingDpi) {
                return res.status(400).json({
                    message: "Error al actualizar el cliente",
                    error: "Validation error: El DPI ya está en uso"
                });
            }
        }

        // Actualizar solo si la validación del DPI ha pasado
        let updatedObject = {
            nombres_cliente: req.body.nombres_cliente,
            apellidos_cliente: req.body.apellidos_cliente,
            edad_cliente: req.body.edad_cliente,
            dpi: req.body.dpi,  // Este DPI ya fue validado si ha cambiado
            fecha_nacimiento: req.body.fecha_nacimiento,
            sexo: req.body.sexo,
            correo_electronico: req.body.correo_electronico,
            telefono: req.body.telefono,
            direccion: req.body.direccion
        };

        let result = await Cliente.update(updatedObject, { returning: true, where: { id_cliente: clienteId } });

        if (!result) {
            return res.status(500).json({
                message: "Error al actualizar el cliente con id = " + clienteId,
                error: "No se pudo actualizar"
            });
        }

        return res.status(200).json({
            message: "Cliente actualizado con éxito con id = " + clienteId,
            cliente: updatedObject
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No existe un cliente con id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente eliminado con éxito con id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};