const db = require('../config/db.config.js'); 
const Factura = db.Facturas;
exports.create = (req, res) => {
    let factura = {};

    try {
        
        factura.fecha = req.body.fecha;
        factura.nombre = req.body.nombre;
        factura.nit = req.body.nit;
        factura.direccion = req.body.direccion;
        factura.telefono = req.body.telefono;
        factura.total = req.body.total;

       
        Factura.create(factura).then(result => {
            res.status(200).json({
                message: "Factura creada con éxito con id = " + result.id_factura,
                factura: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la factura",
            error: error.message
        });
    }
}

exports.retrieveAllFacturas = (req, res) => {
    Factura.findAll()
        .then(facturas => {
            res.status(200).json({
                message: "Facturas obtenidas con éxito",
                facturas: facturas
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener las facturas",
                error: error
            });
        });
}

exports.getFacturaById = (req, res) => {
    let facturaId = req.params.id;
    Factura.findByPk(facturaId)
        .then(factura => {
            if (factura) {
                res.status(200).json({
                    message: "Factura obtenida con éxito con id = " + facturaId,
                    factura: factura
                });
            } else {
                res.status(404).json({
                    message: "No se encontró la factura con id = " + facturaId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener la factura",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No se encontró la factura con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                fecha: req.body.fecha,
                nombre: req.body.nombre,
                nit: req.body.nit,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                total: req.body.total
            }
            let result = await Factura.update(updatedObject, { returning: true, where: { id_factura: facturaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar la factura con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Factura actualizada con éxito con id = " + facturaId,
                factura: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la factura con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await Factura.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe una factura con id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Factura eliminada con éxito con id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la factura con id = " + req.params.id,
            error: error.message,
        });
    }
}