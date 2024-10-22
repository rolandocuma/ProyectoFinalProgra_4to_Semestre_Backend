const db = require('../config/db.config.js');
const Reserva = db.Reservas;

exports.create = (req, res) => {
    let reserva = {};

    try {
        reserva.nombres_reserva = req.body.nombres_reserva;
        reserva.apellidos_reserva = req.body.apellidos_reserva;
        reserva.sexo = req.body.sexo;
        reserva.correo_electronico = req.body.correo_electronico;
        reserva.telefono = req.body.telefono;
        reserva.dpi = req.body.dpi;
        reserva.tipo_habitacion = req.body.tipo_habitacion;
        reserva.num_viajeros = req.body.num_viajeros;
        reserva.fecha_entrada = req.body.fecha_entrada;
        reserva.fecha_salida = req.body.fecha_salida;
        reserva.tipo_pago = req.body.tipo_pago;

        Reserva.create(reserva).then(result => {
            res.status(200).json({
                message: "Reserva creada con éxito con id = " + result.id_reserva,
                reserva: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la reserva",
            error: error.message
        });
    }
};

exports.retrieveAllReservas = (req, res) => {
    Reserva.findAll()
        .then(reservas => {
            res.status(200).json({
                message: "Reservas obtenidas con éxito",
                reservas: reservas
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener las reservas",
                error: error
            });
        });
};

exports.getReservaById = (req, res) => {
    let reservaId = req.params.id;
    Reserva.findByPk(reservaId)
        .then(reserva => {
            res.status(200).json({
                message: "Reserva obtenida con éxito con id = " + reservaId,
                reserva: reserva
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener la reserva",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let reservaId = req.params.id;
        let reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "No se encontró la reserva con id = " + reservaId,
                reserva: "",
                error: "404"
            });
        }

        // Verificar si el DPI ha cambiado
        if (req.body.dpi && req.body.dpi !== reserva.dpi) {
            // Buscar si el nuevo DPI ya está en uso por otra reserva (excluir la reserva actual)
            const existingDpi = await Reserva.findOne({
                where: { dpi: req.body.dpi, id_reserva: { [db.Sequelize.Op.ne]: reservaId } }  // Excluir la reserva actual
            });

            if (existingDpi) {
                return res.status(400).json({
                    message: "Error al actualizar la reserva",
                    error: "Validation error: El DPI ya está en uso"
                });
            }
        }

        // Actualizar solo si la validación del DPI ha pasado
        let updatedObject = {
            nombres_reserva: req.body.nombres_reserva,
            apellidos_reserva: req.body.apellidos_reserva,
            sexo: req.body.sexo,
            correo_electronico: req.body.correo_electronico,
            telefono: req.body.telefono,
            dpi: req.body.dpi,  // Este DPI ya fue validado si ha cambiado
            tipo_habitacion: req.body.tipo_habitacion,
            num_viajeros: req.body.num_viajeros,
            fecha_entrada: req.body.fecha_entrada,
            fecha_salida: req.body.fecha_salida,
            tipo_pago: req.body.tipo_pago
        };

        let result = await Reserva.update(updatedObject, { returning: true, where: { id_reserva: reservaId } });

        if (!result) {
            return res.status(500).json({
                message: "Error al actualizar la reserva con id = " + reservaId,
                error: "No se pudo actualizar"
            });
        }

        return res.status(200).json({
            message: "Reserva actualizada con éxito con id = " + reservaId,
            reserva: updatedObject
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la reserva con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let reservaId = req.params.id;
        let reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            res.status(404).json({
                message: "No existe una reserva con id = " + reservaId,
                error: "404",
            });
        } else {
            await reserva.destroy();
            res.status(200).json({
                message: "Reserva eliminada con éxito con id = " + reservaId,
                reserva: reserva,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la reserva con id = " + req.params.id,
            error: error.message,
        });
    }
};
