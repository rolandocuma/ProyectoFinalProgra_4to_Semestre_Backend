module.exports = (sequelize, Sequelize) => {
    const Prod_Servicios = sequelize.define('prod_servicio', {	
        id_prodServ: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nombre_prodServicio: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },

        descripcion_prodServicio: {
            type: Sequelize.STRING(200), 
            allowNull: true,       
        },

        categoria: {
            type: Sequelize.STRING('producto', 'servicio'), 
            allowNull: false, 
        },

        modelo: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        proveedor: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },

        precio: {
            type: Sequelize.INTEGER(10, 2),
            allowNull: false 
        },

        descuento: {
            type: Sequelize.INTEGER(3, 2),  // se cambio a DECIMAL para % de descunto
            allowNull: true 
        },

        cant_disponible: {
            type: Sequelize.INTEGER,
            allowNull: false, 
        },

        estado_prodServicio: {
            type: Sequelize.STRING('disponible', 'agotado', 'pendiente'),
            allowNull: false
        },

    });

    return Prod_Servicios;
};