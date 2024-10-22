module.exports = (sequelize, Sequelize) => {
	const Clientes = sequelize.define('cliente', {	
	  id_cliente: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
		nombres_cliente: {
        	type: Sequelize.STRING(80),
        	validate: {
          	is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        },
      },
		apellidos_cliente: {
			type: Sequelize.STRING(80),
        	validate: {
          	is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
			}
	},
		edad_cliente: {
			type: Sequelize.INTEGER,
			validate: {
			min: 18,  // La edad mínima que se permite reservar
			max: 99 // La edad máxima que se permite reservart
		}
	},
		fecha_nacimiento: {
			type: Sequelize.DATE,

	},
		sexo: {
			type: Sequelize.ENUM('M', 'F'),

	},

		dpi: {
			type: Sequelize.BIGINT,
			allowNull: false,
			validate: {
			len: [13, 13]
		}
	},

		correo_electronico: {
			type: Sequelize.STRING(150),
      		unique: true,

	},
	telefono: {
		type: Sequelize.INTEGER,
		validate: {
			min: 10000000,
			max: 99999999  
		}
	},
		direccion: {
			type: Sequelize.STRING(100),

	},

    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Clientes;
}
