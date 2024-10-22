const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Reservas = require('../models/MantReserv.model.js')(sequelize, Sequelize);
db.Clientes = require('../models/MantClien.model.js')(sequelize, Sequelize);
db.Empleados = require('../models/MantEmple.model.js')(sequelize, Sequelize);
db.Prod_Servicios = require('../models/MantProdServ.model.js')(sequelize, Sequelize);
db.Habitaciones = require('../models/MantHabita.model.js')(sequelize, Sequelize);
db.Facturas = require('../models/MantFact.model.js')(sequelize, Sequelize);
db.Tipo_Habitaciones = require('../models/MantTipoHabit.model.js')(sequelize, Sequelize);
db.tipoProdServicio = require('../models/MantTipoProdServ.model.js')(sequelize, Sequelize);
db.usuario = require('../models/MantUsuario.model.js')(sequelize, Sequelize);

module.exports = db;