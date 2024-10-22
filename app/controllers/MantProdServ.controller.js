const db = require('../config/db.config.js');
const ProdServicio = db.Prod_Servicios;

exports.create = (req, res) => {
    let prodServicio = {};

    try {
        prodServicio.nombre_prodServicio = req.body.nombre_prodServicio;
        prodServicio.descripcion_prodServicio = req.body.descripcion_prodServicio;
        prodServicio.categoria = req.body.categoria;
        prodServicio.modelo = req.body.modelo;
        prodServicio.proveedor = req.body.proveedor;
        prodServicio.precio = req.body.precio;
        prodServicio.descuento = req.body.descuento;
        prodServicio.cant_disponible = req.body.cant_disponible;
        prodServicio.estado_prodServicio = req.body.estado_prodServicio;

        ProdServicio.create(prodServicio).then(result => {
            res.status(200).json({
                message: "Producto-Servicio creado con éxito con id = " + result.id_prodServ,
                prodServicio: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el producto/servicio",
            error: error.message
        });
    }
}

exports.retrieveAllProdServicios = (req, res) => {
    ProdServicio.findAll()
        .then(prodServicios => {
            res.status(200).json({
                message: "Productos-Servicios obtenidos con éxito",
                prodServicios: prodServicios
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los productos-servicios",
                error: error
            });
        });
}

exports.getProdServicioById = (req, res) => {
    let prodServicioId = req.params.id;
    ProdServicio.findByPk(prodServicioId)
        .then(prodServicio => {
            res.status(200).json({
                message: "Producto-Servicio obtenido con exito con el id = " + prodServicioId,
                prodServicio: prodServicio
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el producto-servicio",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let prodServicioId = req.params.id;
        let prodServicio = await ProdServicio.findByPk(prodServicioId);

        if (!prodServicio) {
            res.status(404).json({
                message: "No se encontró el producto-servicio con id = " + prodServicioId,
                prodServicio: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre_prodServicio: req.body.nombre_prodServicio,
                descripcion_prodServicio: req.body.descripcion_prodServicio,
                categoria: req.body.categoria,
                modelo: req.body.modelo,
                proveedor: req.body.proveedor,
                precio: req.body.precio,
                descuento: req.body.descuento,
                cant_disponible: req.body.cant_disponible,
                estado_prodServicio: req.body.estado_prodServicio
            }

            let result = await ProdServicio.update(updatedObject, { returning: true, where: { id_prodServ: prodServicioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el producto-servicio con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Producto-Servicio actualizado con éxito con id = " + prodServicioId,
                prodServicio: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto-servicio con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let prodServicioId = req.params.id;
        let prodServicio = await ProdServicio.findByPk(prodServicioId);

        if (!prodServicio) {
            res.status(404).json({
                message: "No existe un producto-servicio con id = " + prodServicioId,
                error: "404",
            });
        } else {
            await prodServicio.destroy();
            res.status(200).json({
                message: "Producto-Servicio eliminado con éxito con id = " + prodServicioId,
                prodServicio: prodServicio,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto-servicio con id = " + req.params.id,
            error: error.message,
        });
    }
}