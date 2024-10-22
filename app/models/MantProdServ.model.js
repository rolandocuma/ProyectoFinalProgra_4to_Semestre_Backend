module.exports = (sequelize, Sequelize) => {
    const Prod_Servicios = sequelize.define('prod_servicio', {	
        id_prodServ: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nombre_prodServicio: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },

        descripcion_prodServicio: {
            type: Sequelize.TEXT, 
            allowNull: true,       
        },

        categoria: {
            type: Sequelize.ENUM('producto', 'servicio'), //solo será producto o servicio
            allowNull: false, 
        },

        modelo: {
            type: Sequelize.STRING,
            validate: {
                min: 1,
                max: 12 
            },
            allowNull: false,
        },

        proveedor: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },

        precio: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false 
        },

        descuento: {
            type: Sequelize.DECIMAL(3, 2),  // se cambio a DECIMAL para % de descunto
            allowNull: true 
        },

        cant_disponible: {
            type: Sequelize.INTEGER,
            allowNull: false, 
            validate: {
                min: 0  // ahce que la cantidad disponible no sea negativa
            }
        },

        estado_prodServicio: {
            type: Sequelize.ENUM('disponible', 'agotado', 'pendiente'),
            allowNull: false
        },

        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });

    return Prod_Servicios;
};