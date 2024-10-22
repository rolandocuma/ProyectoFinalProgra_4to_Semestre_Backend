const db = require('../config/db.config.js');
const Tipo_Habitacion = db.Tipo_Habitaciones;

exports.create = (req, res) => {
    let tipoHabitacion = {};

    try {
        tipoHabitacion.tipo_habitacion = req.body.tipo_habitacion;
        tipoHabitacion.descripcion = req.body.descripcion;

        Tipo_Habitacion.create(tipoHabitacion).then(result => {
            res.status(200).json({
                message: "Tipo de habitación creada con éxito con id = " + result.id_tipoHabitacion,
                tipoHabitacion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el tipo de habitación",
            error: error.message
        });
    }
};

exports.retrieveAllTiposHabitacion = (req, res) => {
    Tipo_Habitacion.findAll()
        .then(tipoHabitaciones => {
            res.status(200).json({
                message: "Tipos de habitación obtenidos con éxito",
                tipoHabitaciones: tipoHabitaciones
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los tipos de habitación",
                error: error
            });
        });
};

exports.getTipoHabitacionById = (req, res) => {
    let tipoHabitacionId = req.params.id;
    Tipo_Habitacion.findByPk(tipoHabitacionId)
        .then(tipoHabitacion => {
            if (tipoHabitacion) {
                res.status(200).json({
                    message: "Tipo de habitación obtenida con éxito con id = " + tipoHabitacionId,
                    tipoHabitacion: tipoHabitacion
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el tipo de habitación con id = " + tipoHabitacionId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el tipo de habitación",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let tipoHabitacionId = req.params.id;
        let tipoHabitacion = await Tipo_Habitacion.findByPk(tipoHabitacionId);

        if (!tipoHabitacion) {
            return res.status(404).json({
                message: "No se encontró el tipo de habitación con id = " + tipoHabitacionId,
                tipoHabitacion: "",
                error: "404"
            });
        }

        let updatedObject = {
            tipo_habitacion: req.body.tipo_habitacion,
            descripcion: req.body.descripcion,
        };

        let result = await Tipo_Habitacion.update(updatedObject, { returning: true, where: { id_tipoHabitacion: tipoHabitacionId } });

        if (!result) {
            return res.status(500).json({
                message: "Error al actualizar el tipo de habitación con id = " + tipoHabitacionId,
                error: "No se pudo actualizar"
            });
        }

        return res.status(200).json({
            message: "Tipo de habitación actualizado con éxito con id = " + tipoHabitacionId,
            tipoHabitacion: updatedObject
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el tipo de habitación con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let tipoHabitacionId = req.params.id;
        let tipoHabitacion = await Tipo_Habitacion.findByPk(tipoHabitacionId);

        if (!tipoHabitacion) {
            res.status(404).json({
                message: "No existe un tipo de habitación con id = " + tipoHabitacionId,
                error: "404",
            });
        } else {
            await tipoHabitacion.destroy();
            res.status(200).json({
                message: "Tipo de habitación eliminada con éxito con id = " + tipoHabitacionId,
                tipoHabitacion: tipoHabitacion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el tipo de habitación con id = " + req.params.id,
            error: error.message,
        });
    }
};