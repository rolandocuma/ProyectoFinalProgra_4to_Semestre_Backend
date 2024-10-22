const db = require('../config/db.config.js');
const Habitacion = db.Habitaciones;

exports.create = (req, res) => {
    let habitacion = {};

    try {
        habitacion.disponibilidad = req.body.disponibilidad;
        habitacion.numero_camas = req.body.numero_camas;
        habitacion.precio_noche = req.body.precio_noche;
        habitacion.descuento = req.body.descuento;
        habitacion.piso_delaHabitacion = req.body.piso_delaHabitacion;

        Habitacion.create(habitacion).then(result => {
            res.status(200).json({
                message: "Habitación creada con éxito con id = " + result.id_habitacion,
                habitacion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la habitación",
            error: error.message
        });
    }
}

exports.retrieveAllHabitaciones = (req, res) => {
    Habitacion.findAll()
        .then(habitaciones => {
            res.status(200).json({
                message: "Habitaciones obtenidas con éxito",
                habitaciones: habitaciones
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener las habitaciones",
                error: error
            });
        });
}

exports.getHabitacionById = (req, res) => {
    let habitacionId = req.params.id;
    Habitacion.findByPk(habitacionId)
        .then(habitacion => {
            res.status(200).json({
                message: "Habitación obtenida con éxito con id = " + habitacionId,
                habitacion: habitacion
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener la habitación",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let habitacionId = req.params.id;
        let habitacion = await Habitacion.findByPk(habitacionId);

        if (!habitacion) {
            res.status(404).json({
                message: "No se encontró la habitación con id = " + habitacionId,
                habitacion: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                disponibilidad: req.body.disponibilidad,
                numero_camas: req.body.numero_camas,
                precio_noche: req.body.precio_noche,
                descuento: req.body.descuento,
                piso_delaHabitacion: req.body.piso_delaHabitacion
            }
            let result = await Habitacion.update(updatedObject, { returning: true, where: { id_habitacion: habitacionId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar la habitación con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Habitación actualizada con éxito con id = " + habitacionId,
                habitacion: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la habitación con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let habitacionId = req.params.id;
        let habitacion = await Habitacion.findByPk(habitacionId);

        if (!habitacion) {
            res.status(404).json({
                message: "No existe una habitación con id = " + habitacionId,
                error: "404",
            });
        } else {
            await habitacion.destroy();
            res.status(200).json({
                message: "Habitación eliminada con éxito con id = " + habitacionId,
                habitacion: habitacion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la habitación con id = " + req.params.id,
            error: error.message,
        });
    }
}