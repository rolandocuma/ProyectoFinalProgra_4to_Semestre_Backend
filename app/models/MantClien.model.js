module.exports = (sequelize, Sequelize) => {
	const Clientes = sequelize.define('cliente', {	
	  id_cliente: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
		nombres_cliente: {
        	type: Sequelize.STRING(80),
      },
		apellidos_cliente: {
			type: Sequelize.STRING(80),

	},
		edad_cliente: {
			type: Sequelize.INTEGER,
	},
		fecha_nacimiento: {
			type: Sequelize.DATE,

	},
		sexo: {
			type: Sequelize.STRING('M', 'F'),

	},

		dpi: {
			type: Sequelize.INTEGER,
			allowNull: false,

	},

		correo_electronico: {
			type: Sequelize.STRING(150),
      		unique: true,

	},
	telefono: {
		type: Sequelize.INTEGER,
	},
		direccion: {
			type: Sequelize.STRING(100),

	},


	});
	
	return Clientes;
}
