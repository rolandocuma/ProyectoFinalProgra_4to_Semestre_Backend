const db = require('../config/db.config.js');
const Empleado = db.Empleados;

exports.create = (req, res) => {
    let empleado = {};

    try {
        empleado.nombres_empleado = req.body.nombres_empleado;
        empleado.apellidos_empleado = req.body.apellidos_empleado;
        empleado.puesto_laboral = req.body.puesto_laboral;
        empleado.experiencia_Laboral = req.body.experiencia_Laboral;
        empleado.edad_empleado = req.body.edad_empleado;
        empleado.dpi = req.body.dpi;
        empleado.fecha_contratacionEmpleado = req.body.fecha_contratacionEmpleado;
        empleado.sexo = req.body.sexo;
        empleado.correo_electronico = req.body.correo_electronico;
        empleado.telefono = req.body.telefono;
        empleado.direccion = req.body.direccion;

        Empleado.create(empleado).then(result => {

            res.status(200).json({
                message: "Empleado creado con éxito con id = " + result.id_empleado,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el empleado",
            error: error.message
        });
    }
}

exports.retrieveAllEmpleados = (req, res) => {
    Empleado.findAll()
        .then(empleados => {
            res.status(200).json({
                message: "Empleados obtenidos con éxito",
                empleados: empleados
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los empleados",
                error: error
            });
        });
}

exports.getEmpleadoById = (req, res) => {
    let empleadoId = req.params.id;
    Empleado.findByPk(empleadoId)
        .then(empleado => {
            res.status(200).json({
                message: "Empleado obtenido con éxito con id = " + empleadoId,
                empleado: empleado
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el empleado",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            return res.status(404).json({
                message: "No se encontró el empleado con id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        }

        // Verificar si el DPI ha cambiado
        if (req.body.dpi && req.body.dpi !== empleado.dpi) {
            // Buscar si el nuevo DPI ya está en uso por otro empleado (excluir el empleado actual)
            const existingDpi = await Empleado.findOne({
                where: { dpi: req.body.dpi, id_empleado: { [db.Sequelize.Op.ne]: empleadoId } }  // Excluir al empleado actual
            });

            if (existingDpi) {
                return res.status(400).json({
                    message: "Error al actualizar el empleado",
                    error: "Validation error: El DPI ya está en uso"
                });
            }
        }

        // Actualizar solo si la validación del DPI ha pasado
        let updatedObject = {
            nombres_empleado: req.body.nombres_empleado,
            apellidos_empleado: req.body.apellidos_empleado,
            puesto_laboral: req.body.puesto_laboral,
            experiencia_Laboral: req.body.experiencia_Laboral,
            edad_empleado: req.body.edad_empleado,
            dpi: req.body.dpi,  // Este DPI ya fue validado si ha cambiado
            fecha_contratacionEmpleado: req.body.fecha_contratacionEmpleado,
            sexo: req.body.sexo,
            correo_electronico: req.body.correo_electronico,
            telefono: req.body.telefono,
            direccion: req.body.direccion
        };

        let result = await Empleado.update(updatedObject, { returning: true, where: { id_empleado: empleadoId } });

        if (!result) {
            return res.status(500).json({
                message: "Error al actualizar el empleado con id = " + empleadoId,
                error: "No se pudo actualizar"
            });
        }

        return res.status(200).json({
            message: "Empleado actualizado con éxito con id = " + empleadoId,
            empleado: updatedObject
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado con éxito con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
}