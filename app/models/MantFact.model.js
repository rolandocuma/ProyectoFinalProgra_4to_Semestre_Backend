module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
        id_factura: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        nombre: {
            type: Sequelize.STRING(80),
        	validate: {
          	is: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
			}
	    },
        nit: {
            type: Sequelize.BIGINT,
			allowNull: false,
			validate: {
			len: [8, 8]
		}
	},
        direccion: {
            type: Sequelize.STRING(100),
            allowNull: true 
        },
        telefono: {
            type: Sequelize.INTEGER,
            validate: {
                min: 10000000,  
                max: 99999999 
            }
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },
    });
    return Factura;
};