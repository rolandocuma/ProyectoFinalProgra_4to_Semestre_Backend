let express = require('express');
let router = express.Router();

// Router para reservas
const reservas = require('../controllers/MantReserv.controller.js');

router.post('/api/reservas/create', reservas.create);
router.get('/api/reservas/all', reservas.retrieveAllReservas);
router.get('/api/reservas/onebyid/:id', reservas.getReservaById);
router.put('/api/reservas/update/:id', reservas.updateById);
router.delete('/api/reservas/delete/:id', reservas.deleteById);

module.exports = router;


//Router para los clientes
const clientes = require('../controllers/MantClien.controller.js');

router.post('/api/clientes/create', clientes.create);
router.get('/api/clientes/all', clientes.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id', clientes.getClienteById);
router.put('/api/clientes/update/:id', clientes.updateById);
router.delete('/api/clientes/delete/:id', clientes.deleteById);

module.exports = router;


//Router para empleados
const empleados = require('../controllers/MantEmple.controller.js');

router.post('/api/empleados/create', empleados.create);
router.get('/api/empleados/all', empleados.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id', empleados.getEmpleadoById);
router.put('/api/empleados/update/:id', empleados.updateById);
router.delete('/api/empleados/delete/:id', empleados.deleteById);

module.exports = router;


//Router para los productos y servicios
const prodServicios = require('../controllers/MantProdServ.controller.js');

router.post('/api/prod_servicios/create', prodServicios.create);
router.get('/api/prod_servicios/all', prodServicios.retrieveAllProdServicios);
router.get('/api/prod_servicios/onebyid/:id', prodServicios.getProdServicioById);
router.put('/api/prod_servicios/update/:id', prodServicios.updateById);
router.delete('/api/prod_servicios/delete/:id', prodServicios.deleteById);

module.exports = router;


//Router para habitaciones
const habitaciones = require('../controllers/MantHabita.controller.js');

router.post('/api/habitaciones/create', habitaciones.create);
router.get('/api/habitaciones/all', habitaciones.retrieveAllHabitaciones);
router.get('/api/habitaciones/onebyid/:id', habitaciones.getHabitacionById);
router.put('/api/habitaciones/update/:id', habitaciones.updateById);
router.delete('/api/habitaciones/delete/:id', habitaciones.deleteById);

module.exports = router;


//Router para facturas
const facturas = require('../controllers/MantFact.controller.js');

router.post('/api/facturas/create', facturas.create);
router.get('/api/facturas/all', facturas.retrieveAllFacturas);
router.get('/api/facturas/onebyid/:id', facturas.getFacturaById);
router.put('/api/facturas/update/:id', facturas.updateById);
router.delete('/api/facturas/delete/:id', facturas.deleteById);

module.exports = router;


//router para tipo de habitacion
const tipoHabitacion = require('../controllers/MantTipoHabit.controller.js');

router.post('/api/tipohabitaciones/create', tipoHabitacion.create);
router.get('/api/tipohabitaciones/all', tipoHabitacion.retrieveAllTiposHabitacion);
router.get('/api/tipohabitaciones/onebyid/:id', tipoHabitacion.getTipoHabitacionById);
router.put('/api/tipohabitaciones/update/:id', tipoHabitacion.updateById);
router.delete('/api/tipohabitaciones/delete/:id', tipoHabitacion.deleteById);

module.exports = router;


//router para tipo de producto o servicio
const tipoProdServ = require('../controllers/MantTipoProdServ.controller.js');

router.post('/api/tipoprodserv/create', tipoProdServ.create);
router.get('/api/tipoprodserv/all', tipoProdServ.retrieveAllTiposProdServ);
router.get('/api/tipoprodserv/onebyid/:id', tipoProdServ.getTipoProdServById);
router.put('/api/tipoprodserv/update/:id', tipoProdServ.updateById);
router.delete('/api/tipoprodserv/delete/:id', tipoProdServ.deleteById);

module.exports = router;


// router para usuarios
const usuarioController = require('../controllers/MantUsuario.controller.js');

router.post('/api/usuarios/create', usuarioController.create);
router.get('/api/usuarios/all', usuarioController.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuarioController.getUsuarioById);
router.delete('/api/usuarios/delete/:id', usuarioController.deleteById);

module.exports = router;

